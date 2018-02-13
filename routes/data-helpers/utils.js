module.exports = {
    findRecById: findRecById
};

function findRecById(model, id, clb) {
    var conditions = [{id: id}];
    parseInt(id) && conditions.push({_id: id});
    model.find({$or: conditions}, null, null, function(err, data) {
        clb(data[0]);
    });
};