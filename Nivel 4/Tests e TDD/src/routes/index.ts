import { Router } from "express";

/*Import routers start*/
import appointmentsRouter from "./appointments.routes";
/*Import routers end*/

const router = Router();

router.use("/appointments", appointmentsRouter);

export default router;
