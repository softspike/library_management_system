const return_JSON = function(json_data, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(json_data));
};

module.exports = {
    json: return_JSON
};
