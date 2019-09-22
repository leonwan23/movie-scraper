import {to} from 'await-to-js';
import parseError from 'parse-error';

export const toJs = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if (err) return [parseError(err)];

    return [null, res];
};

export const responseError = function (res, err, code) { // Error Web Response
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json({ success: false, error: err });
};

export const responseSuccess = function (res, data, code) { // Success Web Response
    let send_data = { success: true };

    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

export const throwError = function (err_message, log) {
    if (log === true) {
        console.error(err_message);
    }

    throw new Error(err_message);
};