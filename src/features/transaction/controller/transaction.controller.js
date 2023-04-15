const express = require("express");
const { validateTransactionRequest } = require("../validators/validator");
const db = require("../../../config/sqlConfig");
const { transaction } = require("../../../config/sqlConfig");
const nodemailer = require('nodemailer');
const sendMail = require("../../../utils/nodeMailer");

const router = express.Router();

router.post("/book", async (req, res, next) => {
  try {
    // const { body: { userId, roomId, days } = {} } = req;

    // await validateTransactionRequest(userId, roomId, days);

    // let transaction = { userId, roomId };
    // const startDate = new Date();
    // const currentDate = new Date();
    // const endDate = currentDate.setDate(currentDate.getDate() + days);
    // transaction = { ...transaction, startDate, endDate };

    // await db.transaction.create(transaction);

    // const room = await db.room.findByPk(roomId);
    // const updateRoom = { ...room, status: "BOOKED" };
    // await room.update(updateRoom);
    // res.status(200).send(room);
    sendMail("rrolls0616@gmail.com", "testing")
    res.status(200).send("hello");
  } catch (exception) {
    next(exception);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { params: { userId } = {} } = req;
    const user = await db.user.findByPk(userId);
    const result = [];
    if (user) {
      const transactionList = await db.transaction.findAll({
        where: { userId: userId },
      });
      const roomIdList = transactionList.map((transaction) => {
        return transaction.dataValues.roomId;
      });

      const roomList = await db.room.findAll({ where: { id: roomIdList } });
      let idToRoomMap = {};
      const hotelIdList = [];
      roomList.forEach((room) => {
        idToRoomMap[room.dataValues.id] = room.dataValues;
        hotelIdList.push(room.dataValues.hotelId);
      });
      const hotelList = await db.hotel.findAll({ where: { id: hotelIdList } });
      let idToHotelMap = {};
      hotelList.forEach((hotel) => {
        idToHotelMap[hotel.dataValues.id] = hotel.dataValues;
      });

      transactionList.forEach((transaction) => {
        const entry = {};
        const transactionObject = transaction.dataValues;
        const roomId = transactionObject.roomId;
        const room = idToRoomMap[roomId];
        const hotel = idToHotelMap[room.hotelId];
        entry.startDate = transactionObject.startDate;
        entry.endDate = transactionObject.endDate;
        const hotelDetails = {
          name: hotel.name,
          city: hotel.city,
          url: hotel.url,
          id: hotel.id,
        };
        const roomDetails = { beds: room.beds, id: room.id, price: room.price };
        entry.hotelDetails = hotelDetails;
        entry.roomDetails = roomDetails;
        entry.id = transaction.id;
        result.push(entry);
      });
    }
    res.status(200).send({ result: result, total_count: result.length });
  } catch (exception) {
    next(exception);
  }
});
router.post("/reports", async (req, res, next) => {
  try {
    const { body: { userId, date } = {} } = req;
    const user = await db.user.findByPk(userId);
    const result = [];
    if (user) {
      let transactionList = await db.transaction.findAll();
    
      const roomIdList = transactionList.map((transaction) => {
        return transaction.dataValues.roomId;
      });

      const roomList = await db.room.findAll({ where: { id: roomIdList } });
      let idToRoomMap = {};
      const hotelIdList = [];
      roomList.forEach((room) => {
        idToRoomMap[room.dataValues.id] = room.dataValues;
        hotelIdList.push(room.dataValues.hotelId);
      });
      const hotelList = await db.hotel.findAll({ where: { id: hotelIdList } });
      let idToHotelMap = {};
      hotelList.forEach((hotel) => {
        idToHotelMap[hotel.dataValues.id] = hotel.dataValues;
      });

      transactionList.forEach((transaction) => {
        const entry = {};
        const transactionObject = transaction.dataValues;
        const roomId = transactionObject.roomId;
        const room = idToRoomMap[roomId];
        const hotel = idToHotelMap[room.hotelId];
        entry.startDate = transactionObject.startDate;
        entry.endDate = transactionObject.endDate;
        entry.createdAt = transactionObject.createdAt;
        const hotelDetails = {
          name: hotel.name,
          city: hotel.city,
          url: hotel.url,
          id: hotel.id,
        };
        const roomDetails = { beds: room.beds, id: room.id, price:room.price};
        entry.hotelDetails = hotelDetails;
        entry.roomDetails = roomDetails;
        entry.id = transaction.id;
        result.push(entry);
      });
    }
    res.status(200).send({ result: result, total_count: result.length });
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
