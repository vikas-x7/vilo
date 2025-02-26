import { registerSchema, loginSchema } from "./auth.validator";
import { registerUser, loginUser, getCurrentUser } from "./auth.service";

function handleError(error: unknown) {
  if (error instanceof Error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }

  return Response.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 },
  );
}

export async function registerController(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await registerUser(parsed.data);

    return Response.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function loginController(req: Request) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await loginUser(parsed.data);

    return Response.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function meController(req: Request) {
  try {
    const userIdHeader = req.headers.get("x-user-id");

    if (!userIdHeader) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await getCurrentUser(Number(userIdHeader));

    return Response.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
