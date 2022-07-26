const KnowChart = require('../models/knowchart.model');

module.exports.findAllKnowCharts = (req, res) =>{
    KnowChart.find()
    .then(kChart =>{
        res.json(kChart)
    })
    .catch(err=>{
        res.json(err)
    })
}
module.exports.createNewKnowChart = (req, res) =>{
    KnowChart.create(req.body)
    .then(newlyCreatedKChart =>{
        res.json(newlyCreatedKChart)
    })
    .catch(err=>{
        res.json(err)
    })
}
module.exports.findOneKnowChart = (req, res) =>{
    KnowChart.findOne({_id: req.params.id})
    .then(kChart =>{
        res.json(kChart)
    })
    .catch(err=>{
        res.json(err)
    })
}
module.exports.updateOneKnowChart = (req, res) =>{
    KnowChart.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
    .then(updatedKChart =>{
        res.json(updatedKChart)
    })
    .catch(err=>{
        res.json(err)
    })
}
module.exports.deleteKnowChart = (req, res) =>{
    Rename.deleteOne({_id: req.params.id})
    .then(rename =>{
        res.json(kChart)
    })
    .catch(err=>{
        res.json(err)
    })
}