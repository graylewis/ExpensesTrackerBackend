const Workbook = require('../models/workbook');

exports.getWorkbook = async (req, res) => {
  const workbook = await Workbook.findOne({ userRef: req.user._id });
  
  if (workbook) {
    res.status(200).json(workbook.entries)  
  } else {
    res.status(400).json({err: 'No workbook was found under the requested user id'})
  }
}

exports.saveEntries = async (req, res) => {
  const entries = req.body
  console.log(req.body)
  
  //Sanitize, validate, then...
  const workbook = await Workbook.findOne({ userRef: req.user._id });

  if (workbook) {
    workbook.entries = workbook.entries.concat(entries)
    console.log(workbook.entries)

    const workbook_ = await workbook.save()

    res.status(200).json( workbook.entries.length )
  } else {
    const toSave = {
      userRef: req.user._id,
      entries: entries,
    }
    console.log(toSave)
    const newWorkbook = new Workbook({ ...toSave })
    const workbook_ = await newWorkbook.save();

    res.status(200).json( toSave.entries.length )  
  }
}
