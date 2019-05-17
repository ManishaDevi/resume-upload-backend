module.exports = (res, data) => {
    return res.status(404).json({
        success: false,
        data
    }).end()
}