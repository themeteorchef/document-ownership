import React from 'react';
import { Alert } from 'react-bootstrap';
import DocumentEditor from '../components/DocumentEditor.js';

const renderDocumentEditor = (doc) => {
  return doc ? (<div>
    <h4 className="page-header">Editing "{ doc.title }"</h4>
    <DocumentEditor doc={ doc } />
  </div>) : <Alert bsStyle="warning">Shucks. That document isn't for you to edit!</Alert>;
};

const EditDocument = ({ doc }) => (
  <div className="EditDocument">
    { renderDocumentEditor(doc) }
  </div>
);

EditDocument.propTypes = {
  doc: React.PropTypes.object,
};

export default EditDocument;
