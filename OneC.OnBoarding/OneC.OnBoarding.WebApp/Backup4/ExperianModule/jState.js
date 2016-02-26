
/***************************************************************** 
* Name          : jState
* Developer     : Jeremy Chin
* Description   : A class responsible to store and execute configured triggers 
*                 and transitioning states.
* Params        : 
*                 - initial (string)
*                   Sets the initial state of component.
******************************************************************/
function jState(initial) {
    guard.isNull(initial);

    var _configuredStates = [];
    this.currentState = "";
    this.allowUnconfiguredTrigger = false;

    if (initial != "undefined" && initial != null)
        this.currentState = initial;

    /*****************************************************************
    * Name          : configure
    * Description   : Configures the state for transitions.
    * Type          : Function
    * Params        : 
    *                 - state (string)
    *                   The state to be configured.
    ******************************************************************/
    this.configure = function (state) {
        guard.isNull(state);

        if (!_configuredStates.containsKey(state)) {
            _configuredStates[state] = new jStateConfig(state);
        }

        return new jStateConfigurator(this, _configuredStates[state]);
    };

    /*****************************************************************
    * Name          : getConfig
    * Description   : Gets the configuration for the specified state.
    * Type          : Function
    * Params        : 
    *                 - state (string)
    *                   The state which the configuration belongs to.
    ******************************************************************/
    this.getConfig = function (state) {
        guard.isNull(state);

        if (!_configuredStates.containsKey(state)) {
            _configuredStates[state] = new jStateConfig(state);
        }

        return _configuredStates[state];
    };

    /*****************************************************************
    * Name          : execute
    * Description   : Execute the behaviour configured for the specified
    *                 trigger.
    * Type          : Function
    * Params        : 
    *                 - trigger (string)
    *                   The trigger which to execute.
    ******************************************************************/
    this.execute = function (trigger) {
        guard.isNull(trigger);

        var config = this.getConfig(this.currentState)

        if (!config.containsTrigger(trigger)) {
            if (!this.allowUnconfiguredTrigger) {
                throw new Error("The trigger '" + trigger + "' is not recognized. Please allow the trigger to be used by configuring a relevant state.");
            } 
        }

        var transitionResult = config.transitionTo(trigger);

        if (transitionResult.result) {
            if (this.currentState == transitionResult.behaviour.transitionState &&
                !transitionResult.behaviour.allowReentrant) {
                throw new Error("State re-entrant is not allowed for trigger '" + trigger +
                    "'. To enable state reentrant, set the allowReentrant parameter to true in the configure() method.");
            }

            var transition = new jTransition(this.currentState, transitionResult.behaviour.transitionState, trigger);

            config.exit(transition);
            this.currentState = transitionResult.behaviour.transitionState;
            this.getConfig(this.currentState).enter(transition);
        }
    };
};

/*****************************************************************
* Name          : jStateConfigurator
* Description   : Provides configuration methods to assist state
*                 configuration.
* Params        : 
*                 - machine (jState)
*                   The jState object which controls the state behaviours.
*                 - configuration (jStateConfig)
*                   The configuration object which contains all the
*                   configuration of a state.
******************************************************************/
function jStateConfigurator(machine, configuration) {
    var _machine = machine;
    var _configuration = configuration;

    /*****************************************************************
    * Name          : accept
    * Description   : Accepts a trigger to execute the transition from the
    *                 configured state to the target state.
    * Type          : Function
    * Params        : 
    *                 - trigger (string)
    *                   The trigger that is associated with the transition.
    *                 - state (string)
    *                   The target state to transition into.
    *                 - condition (function : boolean)
    *                   A function that must return true for the state
    *                   transition to happen.
    *                 - allowReentrant (boolean)
    *                   Sets to true to allow the state to transition
    *                   into itself. Otherwise, set to false and it will
    *                   throw an exception when state reentrant happens.
    ******************************************************************/
    this.accept = function(trigger, state, condition, allowReentrant) {
        if (condition == "undefined" || condition == null) condition = function() { return true; }
        var behaviour = new jStateBehaviour(trigger, state, condition, allowReentrant);                
        _configuration.behaviours.push(behaviour);
        return this;
    };

    /*****************************************************************
    * Name          : subStateOf
    * Description   : Sets a superstate to the state in context.
    * Type          : Function
    * Params        : 
    *                 - state (string)
    *                   The state to set as super state of the state 
    *                   in context.
    ******************************************************************/
    this.subStateOf = function (state) {
        _configuration.parent = _machine.getConfig(state);
    };

    /*****************************************************************
    * Name          : onEnter
    * Description   : Sets a callback that is executed when transitioning
    *                 into the state in context.
    * Type          : Function
    * Params        : 
    *                 - callback (function(jTransition))
    *                   A callback to be executed.    
    ******************************************************************/
    this.onEnter = function (callback) {
        _configuration.enterActions.push(callback);
        return this;
    }

    /*****************************************************************
    * Name          : onExit
    * Description   : Sets a callback that is executed when transitioning
    *                 from the state in context.
    * Type          : Function
    * Params        : 
    *                 - callback (function(jTransition))
    *                   A callback to be executed.    
    ******************************************************************/
    this.onExit = function (callback) {        
        _configuration.exitActions.push(callback);
        return this;
    }
};

/***************************************************************** 
* Name: jStateConfig
* Provides the state transition behaviours and other configuration.
******************************************************************/
/*****************************************************************
* Name          : jStateConfig
* Description   : Provides the state transition behaviours and other 
*                 configuration.
* Params        : 
*                 - state (string)
*                   The state which the configuration belongs to.    
******************************************************************/
function jStateConfig(state) {
    var _state = state;

    this.behaviours = [];
    this.enterActions = [];
    this.exitActions = [];
    this.parent = null;

    /*****************************************************************
    * Name          : containsTrigger
    * Description   : Checks if a trigger is accepted in this state
    *                 configuration (including its superState).
    * Type          : Function
    * Params        : 
    *                 - trigger (string)
    *                   The trigger to search.    
    ******************************************************************/
    this.containsTrigger = function (trigger) {
        var result = [];

        this.behaviours.each(function (i) {
            if (i.trigger === trigger)
                result.push(i.trigger);
        });

        return (result.length > 0 || (this.parent != null && this.parent.containsTrigger(trigger)));
    };    

    /*****************************************************************
    * Name          : transitionTo
    * Description   : Finds the transition states that match the provided 
    *                 trigger and meet their conditions.
    * Type          : Function
    * Params        : 
    *                 - trigger (string)
    *                   The trigger that is associated with the transition.    
    ******************************************************************/    
    this.transitionTo = function (trigger) {
        var result = false;
        var matches = this.getBehaviours(trigger);
        var passedMatches = [];

        matches.each(function (i) {
            if (i.condition()) {
                passedMatches.push(i);
            }
        });

        if (passedMatches.length > 1) {
            throw new Error("Multiple transitions that met conditions are found from state '" +
               _state +
               "' for trigger '" +
               trigger +
               "'. Conditions for a set of state and trigger must be mutually exclusive.");
        }

        result = (passedMatches.length == 1);
        var behaviour = passedMatches.length == 1 ? passedMatches[0] : null;
        var transitionResult = new jTransitionResult(result, behaviour);

        if (!result && this.parent != null) {
            var parentResult = null;
            parentResult = this.parent.transitionTo(trigger);

            if (parentResult != null) {
                transitionResult.result = parentResult.result;
                transitionResult.behaviour = parentResult.behaviour;
            }
        }

        return transitionResult;
    };

    /*****************************************************************
    * Name          : enter
    * Description   : Executes all configured callbacks when entering 
    *                 the state in context.
    * Type          : Function
    * Params        : 
    *                 - transition (jTransition)
    *                   The transition map.
    ******************************************************************/   
    this.enter = function (transition) {        
        this.enterActions.each(function (action) {
            action(transition);
        });
    };

    /*****************************************************************
    * Name          : exit
    * Description   : Executes all configured callbacks when exiting 
    *                 the state in context.
    * Type          : Function
    * Params        : 
    *                 - transition (jTransition)
    *                   The transition map.
    ******************************************************************/   
    this.exit = function (transition) {        
        this.exitActions.each(function (action) {
            action(transition);
        });
    };

    /*****************************************************************
    * Name          : getBehaviours
    * Description   : Gets all behaviours for a provided trigger.
    * Type          : Function
    * Params        : 
    *                 - trigger (string)
    *                   The trigger that is associated with the behaviours.
    ******************************************************************/  
    this.getBehaviours = function (trigger) {
        var result = [];

        result = this.behaviours.where(function (i) {
            return i.trigger === trigger;
        });

        return result;
    };
};

/*****************************************************************
* Name          : jStateBehaviour
* Description   : Stores the behaviour of a state transition
*                 associated with a trigger.
* Params        : 
*                 - trigger (string)
*                   The trigger that is associated with the transition.
*                 - state (string)
*                   The target state to transition into.
*                 - condition (function : boolean)
*                   A function that must return true for the state
*                   transition to happen.
*                 - allowReentrant (boolean)
*                   Sets to true to allow the state to transition
*                   into itself. Otherwise, set to false and it will
*                   throw an exception when state reentrant happens.
******************************************************************/  
function jStateBehaviour(trigger, transitionState, condition, allowReentrant) {
    this.trigger = trigger;
    this.transitionState = transitionState;
    this.allowReentrant = allowReentrant;
    this.condition = condition;
};

/*****************************************************************
* Name          : jTransition
* Description   : Represents a transition map.
* Params        : 
*                 - sourceState (jState)
*                   The original state of the transition.
*                 - targetState (jState)
*                   The target state of the transition.
*                 - trigger (string)
*                   The trigger that is associated with the transition.
******************************************************************/ 
function jTransition(sourceState, targetState, trigger) {
    this.sourceState = sourceState;
    this.targetState = targetState;
    this.trigger = trigger;
};

/*****************************************************************
* Name          : jTransitionResult
* Description   : Represents a transition result.
* Params        : 
*                 - result (boolean)
*                   The original state of the transition.
*                 - behaviour (jStateBehaviour)
*                   The behaviour that is associated with the transition
*                   result.
******************************************************************/ 
function jTransitionResult(result, behaviour) {
    this.result = result;
    this.behaviour = behaviour;
};

/*******************************************************************
* Utilities
*******************************************************************/
// Provides argument checking
var guard = {
    isNull: function (obj) {
        if (obj == "undefined" || obj == null) throw new Error("Argument cannot be null or undefined.");        
    }
};

/*******************************************************************
* Array Extensions
********************************************************************/
Array.prototype.each = function (action) {
    for (var i = 0; i < this.length; i++)
        action(this[i]);
}

Array.prototype.containsKey = function(item) {
   for (i in this) {
       if (i === item) return true;
   }

   return false;
};

// Compares target array 
Array.prototype.compare = function(arr) {
    if (this.length != arr.length) return false;

    for (var i = 0; i < arr.length; i++) {
        if (this[i].compare) {
            if (!this[i].compare(arr[i])) return false;
        }

        if (this[i] !== arr[i]) return false;
    }

    return true;
}

// Returns a new array which is the union of this and target array.
Array.prototype.union = function() {
    var result = [].concat(this);
    var length = arguments.length;

    for (var i = 0; i < length; i++) {
        result = result.concat(arguments[i]);
    }

    return result.distinct();
};

// Returns new array with duplicate values removed.
Array.prototype.distinct = function() {
    var result = [];
    var length = this.length;

    for (var i = 0; i < length; i++) {
        for (var j = i + 1; j < length; j++) {
            // If this[i] is found later in the array
            if (this[i] === this[j])
                j = ++i;
        }

        result.push(this[i]);
    }

    return result;
};

// Returns a new array with elements that meet the condition.
Array.prototype.where = function (condition) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (condition(this[i])) result.push(this[i]);
    }    
    return result;
};

