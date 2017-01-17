var wrappedPromise = function() {
  var wrapped = {},
    promise = new Promise(function(resolve, reject) {
      wrapped.resolve = resolve;
      wrapped.reject = reject;
    });

    wrapped.then = promise.then.bind(promise);
    wrapped.catch = promise.catch.bind(promise);
    wrapped.promise = promise;
    return wrapped;
}

var processStatus = function(response) {
  if(response.status === 200 || response.status === 0)
    return Promise.resolve(response);
  else
    return Promise.reject(new Error(response.statusText));
}

var parseResponse = function(response) { return response.json(); }

var wrappedFetch = function() {
  var promised = wrappedPromise();

  var args = Array.prototype.slice.call(arguments);

  fetch.apply(null, args).
  then(function(response) {
      promised.resolve(response);
  }, function(error) {
    promised.reject(error);
  }).
  catch(function(error) {
    promised.catch(error);
  });
  return promised;
}

/**
 * fetch wrapper
 * @param { {
 * method: { String },
 * url: { String },
 * headers: { Object },
 * body: { String },
 * [ cacheBusting ]: { Boolean }
 * } }
 */
var AjaxFunction = function(params) {

  params.timeout = params.timeout = MAX_TIMEOUT;
  params.body =
  (typeof params.body === 'object') ? JSON.stringify(params.body) : params.body;

  params.method = params.method || "GET";

  (params.cacheBusting) ? params.url + '?' + new Date().getTime() : params.url;

  var wrapped = wrappedFetch();

  var timeoutId = setTimeout(function() {
    wrapped.reject(new Error("La requète n'a pas aboutie !"));
  }, params.timeout);

  return wrapped.promise.then(function(response) {
    clearTimeout(timeoutId);
    //console.log(response.body);
    return response;
  }).then(processStatus).then(parseResponse);
}

const TIEMOUT_DEFAULT = 60000;

export const MAX_TIMEOUT = TIEMOUT_DEFAULT;
export default Ajax = AjaxFunction;
