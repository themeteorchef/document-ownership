import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Alert } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeDocument } from '../../api/documents/methods.js';

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeDocument.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        browserHistory.push('/documents');
      }
    });
  }
};

const renderDocument = (doc) => {
  return doc ? (<div>
    <div className="page-header clearfix">
      <h4 className="pull-left">{ doc.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button href={`/documents/${doc._id}/edit`}>Edit</Button>
          <Button onClick={ () => handleRemove(doc._id) } className="text-danger">Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { doc.body }
  </div>) : <Alert bsStyle="warning">Well, fudge. We couldn't find that document!</Alert>;
};

const ViewDocument = ({ doc }) => (
  <div className="ViewDocument">
    { renderDocument(doc) }
  </div>
);

ViewDocument.propTypes = {
  doc: React.PropTypes.object.isRequired,
};

export default ViewDocument;
