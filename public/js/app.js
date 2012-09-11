(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"chaplin/controllers/app": function(exports, require, module) {
  var AppController, BodyView, Chaplin, JSONView, Mediator, XMLView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  BodyView = require('chaplin/views/Body');

  XMLView = require('chaplin/views/XML');

  JSONView = require('chaplin/views/JSON');

  module.exports = AppController = (function(_super) {

    __extends(AppController, _super);

    function AppController() {
      return AppController.__super__.constructor.apply(this, arguments);
    }

    AppController.prototype.historyURL = function(params) {
      return '';
    };

    AppController.prototype.initialize = function() {
      var _ref;
      AppController.__super__.initialize.apply(this, arguments);
      if ((_ref = this.views) == null) {
        this.views = [];
      }
      return this.views.push(new BodyView());
    };

    AppController.prototype.index = function() {
      this.views.push((new XMLView()).render());
      return this.views.push((new JSONView()).render());
    };

    return AppController;

  })(Chaplin.Controller);
  
}});

window.require.define({"chaplin/core/Application": function(exports, require, module) {
  var App, Chaplin, Mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  routes = require('chaplin/core/routes');

  module.exports = App = (function(_super) {

    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.title = 'InterMine Translate PathQuery';

    App.prototype.data = {};

    App.prototype.initialize = function() {
      App.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        'controllerPath': 'chaplin/controllers/',
        'controllerSuffix': ''
      });
      this.layout = new Chaplin.Layout({
        title: this.title
      });
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    return App;

  })(Chaplin.Application);
  
}});

window.require.define({"chaplin/core/Mediator": function(exports, require, module) {
  var Backbone, mediator,
    __slice = [].slice;

  Backbone = require('backbone');

  module.exports = mediator = {};

  mediator.publish = function() {
    var opts, _ref;
    opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = Backbone.Events).trigger.apply(_ref, opts);
  };

  mediator.subscribe = function() {
    var opts, _ref;
    opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = Backbone.Events).on.apply(_ref, opts);
  };

  mediator.unsubscribe = function() {
    var channel, opts, _ref;
    opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    assert(Backbone.Events._callbacks != null, 'No channels exist');
    if ((channel = opts[0]) != null) {
      assert(Backbone.Events._callbacks[channel] != null, "Unknown channel `" + channel + "`");
    }
    return (_ref = Backbone.Events).off.apply(_ref, opts);
  };

  mediator.channels = function() {
    return Object.keys(Backbone.Events._callbacks);
  };

  mediator.reset = function() {
    return Backbone.Events._callbacks = null;
  };
  
}});

window.require.define({"chaplin/core/routes": function(exports, require, module) {
  /*
  The routes for the application. This module returns a function.
  @param {function} match Method of the Router.
  */

  module.exports = function(match) {
    return match('', 'app#index');
  };
  
}});

window.require.define({"chaplin/initialize": function(exports, require, module) {
  var App;

  App = require('chaplin/core/Application');

  $(function() {
    window.App = new App();
    return window.App.initialize();
  });
  
}});

window.require.define({"chaplin/templates/body": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
        __out.push('<header>\n    <h1>InterMine <span>Translate PathQuery</span></h1>\n</header>\n\n<div class="editor">\n    <div id="xml"></div>\n</div>\n<div class="editor">\n    <div id="json"></div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/editor": function(exports, require, module) {
  module.exports = function (__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/views/Body": function(exports, require, module) {
  var BodyView, Chaplin, Mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  module.exports = BodyView = (function(_super) {

    __extends(BodyView, _super);

    function BodyView() {
      return BodyView.__super__.constructor.apply(this, arguments);
    }

    BodyView.prototype.container = 'body';

    BodyView.prototype.containerMethod = 'html';

    BodyView.prototype.autoRender = true;

    BodyView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/body');
    };

    return BodyView;

  })(Chaplin.View);
  
}});

window.require.define({"chaplin/views/Editor": function(exports, require, module) {
  var Chaplin, EditorView, Mediator, Translate,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  this.t = Translate = require('translate');

  module.exports = EditorView = (function(_super) {

    __extends(EditorView, _super);

    function EditorView() {
      this.translate = __bind(this.translate, this);
      return EditorView.__super__.constructor.apply(this, arguments);
    }

    EditorView.prototype.containerMethod = 'html';

    EditorView.prototype.timeout = null;

    EditorView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/editor');
    };

    EditorView.prototype.dispose = function() {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }
      delete this.timeout;
      return EditorView.__super__.dispose.apply(this, arguments);
    };

    EditorView.prototype.translate = function(text, fce) {
      var _this = this;
      if ((text != null) && (fce != null)) {
        return Translate[fce](text, function(err, output) {
          if (_this.error != null) {
            $(_this.error).remove();
          }
          if (!err) {
            return _this.session.setValue(output);
          } else {
            return $(_this.container).append(_this.error = $('<div/>', {
              'class': 'error',
              'text': err.message.split("\n")[0]
            }));
          }
        });
      }
    };

    EditorView.prototype.inFocus = function() {
      return $(this.container).hasClass('ace_focus');
    };

    EditorView.prototype.setHeight = function() {
      var height;
      height = $(window).height() - $('header h1').height() - 30;
      $(this.container).css('height', height);
      return $(this.container).find('.ace_editor').css('height', height);
    };

    EditorView.prototype.afterRender = function() {
      var editor, renderer,
        _this = this;
      EditorView.__super__.afterRender.apply(this, arguments);
      editor = ace.edit(this.container.slice(1));
      editor.setTheme("ace/theme/clouds_midnight");
      this.session = editor.getSession();
      renderer = editor.renderer;
      this.session.setMode(this.mode);
      this.session.setUseWrapMode(false);
      this.session.setWrapLimitRange(null, null);
      renderer.setPrintMarginColumn(80);
      renderer.setShowPrintMargin(false);
      this.session.setUseWrapMode(true);
      this.setHeight();
      this.session.on('change', function(obj) {
        if (_this.inFocus()) {
          if (_this.timeout != null) {
            clearTimeout(_this.timeout);
          }
          return _this.timeout = setTimeout((function() {
            return Mediator.publish(_this.fce, _this.session.getValue());
          }), 500);
        }
      });
      Mediator.subscribe(this.our, function(text) {
        if (!_this.inFocus()) {
          return _this.translate(text, _this.our);
        }
      });
      return $(window).resize(function() {
        return _this.setHeight();
      });
    };

    return EditorView;

  })(Chaplin.View);
  
}});

window.require.define({"chaplin/views/JSON": function(exports, require, module) {
  var EditorView, JSONView, Mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EditorView = require('chaplin/views/Editor');

  Mediator = require('chaplin/core/Mediator');

  module.exports = JSONView = (function(_super) {

    __extends(JSONView, _super);

    function JSONView() {
      return JSONView.__super__.constructor.apply(this, arguments);
    }

    JSONView.prototype.mode = 'ace/mode/json';

    JSONView.prototype.fce = 'toXML';

    JSONView.prototype.our = 'toJSON';

    JSONView.prototype.container = '#json';

    JSONView.prototype.afterRender = function() {
      JSONView.__super__.afterRender.apply(this, arguments);
      return this.session.setValue("{\n    \"name\": \"\",\n    \"model\": \"genomic\",\n    \"select\": [\n        \"Gene.secondaryIdentifier\",\n        \"Gene.interactions.role\",\n        \"Gene.interactions.interactingGenes.primaryIdentifier\",\n        \"Gene.interactions.interactingGenes.secondaryIdentifier\",\n        \"Gene.interactions.name\",\n        \"Gene.interactions.type.name\",\n        \"Gene.interactions.confidenceText\",\n        \"Gene.interactions.dataSets.dataSource.name\",\n        \"Gene.interactions.experiment.publication.pubMedId\"\n    ],\n    \"longDescription\": \"Show all known interactions between two specific genes. (Data Source: IntAct, BioGrid). \",\n    \"sortOrder\": \"Gene.secondaryIdentifier asc\",\n    \"constraintLogic\": \"A and C and B\",\n    \"constraints\": [\n        {\n            \"path\": \"Gene.interactions.interactionType\",\n            \"code\": \"B\",\n            \"op\": \"=\",\n            \"value\": \"physical\"\n        },\n        {\n            \"path\": \"Gene\",\n            \"code\": \"A\",\n            \"op\": \"LOOKUP\",\n            \"value\": \"wg\",\n            \"extraValue\": \"\"\n        },\n        {\n            \"path\": \"Gene.interactions.interactingGenes\",\n            \"code\": \"C\",\n            \"op\": \"LOOKUP\",\n            \"value\": \"CG14487\",\n            \"extraValue\": \"\"\n        }\n    ]\n}");
    };

    return JSONView;

  })(EditorView);
  
}});

window.require.define({"chaplin/views/XML": function(exports, require, module) {
  var EditorView, Mediator, XMLView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EditorView = require('chaplin/views/Editor');

  Mediator = require('chaplin/core/Mediator');

  module.exports = XMLView = (function(_super) {

    __extends(XMLView, _super);

    function XMLView() {
      return XMLView.__super__.constructor.apply(this, arguments);
    }

    XMLView.prototype.mode = 'ace/mode/xml';

    XMLView.prototype.fce = 'toJSON';

    XMLView.prototype.our = 'toXML';

    XMLView.prototype.container = '#xml';

    XMLView.prototype.afterRender = function() {
      XMLView.__super__.afterRender.apply(this, arguments);
      return this.session.setValue("<query name=\"\" model=\"genomic\" view=\"Gene.secondaryIdentifier Gene.interactions.role Gene.interactions.interactingGenes.primaryIdentifier Gene.interactions.interactingGenes.secondaryIdentifier Gene.interactions.name Gene.interactions.type.name Gene.interactions.confidenceText Gene.interactions.dataSets.dataSource.name Gene.interactions.experiment.publication.pubMedId\" longDescription=\"Show all known interactions between two specific genes. (Data Source: IntAct, BioGrid). \" sortOrder=\"Gene.secondaryIdentifier asc\" constraintLogic=\"A and C and B\">\n    <constraint path=\"Gene.interactions.interactionType\" code=\"B\" op=\"=\" value=\"physical\"/>\n    <constraint path=\"Gene\" code=\"A\" op=\"LOOKUP\" value=\"wg\" extraValue=\"\"/>\n    <constraint path=\"Gene.interactions.interactingGenes\" code=\"C\" op=\"LOOKUP\" value=\"CG14487\" extraValue=\"\"/>\n</query>");
    };

    return XMLView;

  })(EditorView);
  
}});

