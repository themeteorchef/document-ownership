import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../documents';

Meteor.publish('documents.list', function documentsList() {
  const owner = this.userId;
  if (owner) return Documents.find({ owner });
  return this.ready();
});

Meteor.publish('documents.view', function documentsView(_id) {
  check(_id, String);
  const owner = this.userId;
  if (owner) return Documents.find({ _id, owner });
  return this.ready();
});
