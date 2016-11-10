import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Documents from '../../api/documents/documents.js';
import DocumentsList from '../components/DocumentsList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('documents.list');
  if (subscription.ready()) {
    const owner = Meteor.userId();
    const documents = owner ? Documents.find({ owner }).fetch() : [];
    onData(null, { documents });
  }
};

export default composeWithTracker(composer, Loading)(DocumentsList);
