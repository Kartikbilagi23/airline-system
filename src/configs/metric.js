const client = require("prom-client");

// collect default metrics
client.collectDefaultMetrics();

// custom metrics
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpRequestDuration = new client.Histogram({
  name: "http_requests_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

const bookingCounter = new client.Counter({
  name: "booking_total",
  help: "Total confirmed bookings",
});

const paymentFailureCounter = new client.Counter({
  name: "payment_failures_total",
  help: "Total failed payments",
});

module.exports = {
  client,
  httpRequestCounter,
  httpRequestDuration,
  bookingCounter,
  paymentFailureCounter,
};