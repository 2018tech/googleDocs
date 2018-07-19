var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  documentList: [{type: mongoose.Schema.ObjectId, ref: 'Document'}]
});

var documentSchema = new mongoose.Schema({
  documentName: String,
  owner: {type: mongoose.Schema.ObjectId, ref: 'User'},
  content: String,
  collaborators: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Document: mongoose.model('Document', documentSchema)
};
