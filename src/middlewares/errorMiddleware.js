export const errorMiddleware = async (error, req, res, next) => {
    const message = error?.message || "Internal server error...";
    const statusCode = error?.code || 500;

    res.status(statusCode).json({
        message: message,
        success: false
    })

}