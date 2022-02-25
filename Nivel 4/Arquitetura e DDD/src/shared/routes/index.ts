import { Router } from "express";

/*Import routers start*/
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
/*Import routers end*/

const router = Router();

router.use("/appointments", appointmentsRouter);
router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);

export default router;
