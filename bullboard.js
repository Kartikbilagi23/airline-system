const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const paymentQueue = require("./src/queues/paymentQueue");
const deadLetterQueue=require("./src/queues/deadLetterQueue")

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [
    new BullMQAdapter(paymentQueue),
    new BullMQAdapter(deadLetterQueue)
  ],
  serverAdapter
});

module.exports = serverAdapter;