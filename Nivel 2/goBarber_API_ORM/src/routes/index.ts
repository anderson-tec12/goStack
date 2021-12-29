import { Router } from "express";

/*Import routers start*/
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
/*Import routers end*/

const router = Router();

router.use("/appointments", appointmentsRouter);
router.use("/users", usersRouter);

export default router;
