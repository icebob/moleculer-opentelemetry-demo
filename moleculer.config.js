"use strict";

const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

const OpenTelemetryMiddleware = require("./opentelemetry.middleware");

const sdk = new NodeSDK({
	instrumentations: [getNodeAutoInstrumentations()]
});

process.env.MONGO_URI = "mongodb://localhost:27017/otel-test";
module.exports = async function() {
	await sdk.start();

	return {
		transporter: "Redis",
		cacher: "Redis",

		// Ddisable built-in metrics.
		metrics: {
			enabled: false,
		},

		// Disable built-in tracing.
		tracing: {
			enabled: false,
		},

		// Register custom middlewares
		middlewares:
		[
			"ActionHook",
			"Validator",
			"Bulkhead",
			"Cacher",
			"ContextTracker",
			"CircuitBreaker",
			"Timeout",
			"Retry",
			"Fallback",
			"ErrorHandler",
			OpenTelemetryMiddleware,
			"Metrics",
			"Debounce",
			"Throttle"
		]
	};
};
