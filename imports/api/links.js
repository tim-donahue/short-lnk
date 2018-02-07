import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({userId: this.userId});
  });
}


// resource.actions
// links.insert
Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        required: true,
        label: 'Your link'
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      lastVisitedAt: null,
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0
    })
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        required: true,
        min: 1,
        label: 'Link ID'
      },
      visible: {
        type: Boolean,
        required: true
      }
    }).validate({ _id, visible });

    Links.update(
      {
        _id,
        userId: this.userId
      }, {
        $set: {visible}
      }
    );
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        required: true,
        min: 1,
        label: 'Link ID'
      }
    }).validate({ _id });

    Links.update({ _id }, {
      $inc: { visitedCount: 1 },
      $set: { lastVisitedAt: new Date().getTime() }
    } )

  }
});