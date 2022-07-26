const KnowChartController = require("../controllers/knowchart.controller");

//get, post, put, delete
module.exports = (app) =>{
    app.get("/api/knowchart", KnowChartController.findAllKnowCharts);
    app.post("/api/knowchart", KnowChartController.createNewKnowChart);
    app.get("/api/knowchart/:id", KnowChartController.findOneKnowChart);
    app.put("/api/knowchart/:id", KnowChartController.updateOneKnowChart);
    app.delete("/api/knowchart/:id", KnowChartController.deleteKnowChart);
}