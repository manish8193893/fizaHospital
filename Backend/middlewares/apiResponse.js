export const apiResponseMiddleware = (req, res, next) => {
    res.apiResponse = (status, msgText, msgEventCode, propertyName = null, resultObj = null) => {
        return res.json({
            status,
            msgText,
            msgEventCode,
            propertyName,
            resultObj,
        });
    };

    res.apiSuccess = (resultObj = null, msgText = 'Success', msgEventCode = 'Success_200', propertyName = null) => {
        return res.apiResponse(1, msgText, msgEventCode, propertyName, resultObj);
    };

    res.apiError = (msgText = 'Something went wrong', msgEventCode = 'Error_400', propertyName = '', resultObj = null, statusCode = 400) => {
        return res.status(statusCode).json({
            status: 0,
            msgText,
            msgEventCode,
            propertyName,
            resultObj,
        });
    };

    next();
};

export const notFoundHandler = (req, res) => {
    return res.apiError('API route not found', 'NotFound_404', '', null, 404);
};

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    const message = err?.message || 'Internal Server Error';
    const statusCode = err?.status || 500;
    return res.apiError(message, err?.eventCode || 'Error_500', err?.propertyName || '', null, statusCode);
};
