"use strict";

var NodeBB = require('./nodebb'),

	packageInfo = require('../package.json'),
	pluginInfo = require('../plugin.json'),
	pluginId = pluginInfo.id.replace('nodebb-plugin-', '');

(function(Config) {

	Config.plugin = {
		name: pluginInfo.name,
		id: pluginId,
		version: packageInfo.version,
		description: packageInfo.description,
		icon: 'fa-bar-chart-o'
	};

	Config.defaults = {
		toggles: {
			allowAnon: false
		},
		limits: {
			maxOptions: 10
		},
		defaults: {
			title: 'Poll',
			maxvotes: 1,
			disallowVoteUpdate: 0,
			end: 0
		},
		version: ''
	};

	Config.settings = {};

	Config.init = function(callback) {
		Config.settings = new NodeBB.Settings(Config.plugin.id, Config.plugin.version, Config.defaults, function() {
			Config.settings.set('version', Config.plugin.version);
			Config.settings.persist(function() {
				callback();
			});
		});
	};

	Config.adminSockets = {
		sync: function() {
			Config.settings.sync();
		},
		getDefaults: function(socket, data, callback) {
			callback(null, Config.settings.createDefaultWrapper());
		}
	};

})(exports);