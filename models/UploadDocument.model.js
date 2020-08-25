// constructor
const UploadDocument = function (request) {
    this.documentReq = request.documentReq;
    this.documentName = request.documentName;
  };
  
  UploadDocument.upload = (newRequest, result) => {
    let document = newRequest.documentReq.document;
    console.log(newRequest.documentName)
    document.mv('./uploads/' + newRequest.documentName);
    result(null, {
      status: true,
      message: 'File is uploaded',
      data: {
        name: document.name,
        mimetype: document.mimetype,
        size: document.size
      }
    });
  };
  
  module.exports = UploadDocument;