import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Documents from '../../api/documents/documents.js';
import ViewDocument from '../pages/ViewDocument.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('documents.view', params._id);

  if (subscription.ready()) {
    const owner = Meteor.userId();
    const doc = owner ? Documents.findOne({ _id: params._id, owner }) : {};
    onData(null, { doc });
  }
};

export default composeWithTracker(composer, Loading)(ViewDocument);
