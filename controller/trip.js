const express = require("express");
const admin = require("firebase-admin");
const liked = require("../utils/liked");

const firestore = admin.firestore();

exports.createTripRoom = async (req, res) => {
  const { uid, tripName, budget, days, place } = req.body;
  const _trip = {
    uid: uid,
    tripName: tripName,
    budget: budget,
    balance: budget,
    days: days,
    place: place,
    likes: []
  }

  try {
    const _createTripRoom = await firestore.collection("trips").add(_trip)

    const update = await _createTripRoom.update({ tripId: _createTripRoom.id })

    res.status(201).json({ code: "trip/created", message: update })
  } catch (error) {
    res.status(400).json(error)
  }

}


exports.fetchBooked = async (req, res) => {
  const { uid, tripId } = req.body;
  const _trip = {
    uid: uid,
    tripId: tripId,
  }

  try {
    const fetching = await firestore.collection("booking").where("uid", "==", uid).where("tripId", "==", tripId).get()

    console.log(fetching.docs)

    res.status(200).json({ code: "trip/fetch_booked", message: fetching.docs })
  } catch (error) {
    res.status(400).json(error)
  }

}


exports.updateBalance = async (req, res) => {
  const { uid, tripId, pay } = req.body;

  try {
    const ref = await firestore.collection("trips").doc(tripId)

    const update = await ref.update({ balance: admin.firestore.FieldValue.increment(pay * (-1)) })

    res.status(200).json({ code: "trip/balance_updated", message: update })
  } catch (error) {
    res.status(403).json(error)
  }
}


exports.commenting = async (req, res) => {
  const { uid, tripId, comments, username, userImg } = req.body;

  try {
    const ref = await firestore.collection("comments");

    const set = await ref.add({ tripId: tripId, username: username, userImg: userImg, comments: comments })

    res.status(201).json({ code: "trip/comment", message: set })
  } catch (error) {
    res.status(403).json(error)
  }
}


exports.likeTrip = async (req, res) => {
  const { tripId, uid } = req.body;
  const _collection = "trips"
  try {

      const like = await liked(_collection, tripId, uid);

      res.status(201).json({ code: "trip/liked", message: like })

  } catch (error) {
      res.status(400).json(error)
  }
}