import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from './documents';
import rateLimit from '../../modules/rate-limit.js';

export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(document) {
    const documentToInsert = document;
    documentToInsert.owner = this.userId;
    return Documents.upsert({ _id: document._id }, { $set: documentToInsert });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const documentToDelete = Documents.findOne(_id, { fields: { owner: 1 } });
    if (documentToDelete && documentToDelete.owner === this.userId) {
      Documents.remove(_id);
    } else {
      throw new Meteor.Error('500', 'Sorry, guppie. That\'s not for you to delete!');
    }
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
