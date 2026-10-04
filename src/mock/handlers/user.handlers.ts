import { bypass, http, HttpResponse } from "msw";
import type { ApiUser, CreateUserDTO, UpdateUserDTO } from "@/types/user.types";
import type { IdParam } from "@/types/mock/idParam.types";
import type {
  LoginDTO,
  AuthSuccessResponse,
  ErrorResponse,
} from "@/types/mock";
import { MOCK_USERS } from "@/mock/data/users.data"

// Cloned in memory so mutate operations (POST, PUT, DELETE) won't permanently corrupt the seed array
let usersState: ApiUser[] = [...MOCK_USERS];

const BASE = "https://fakestoreapi.com";

const fetchWithTimeout = (input: RequestInfo | URL, ms = 3500) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(input, { signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
};

// Helper to generate a valid base64-encoded JWT structure
const createMockJwt = (userId: number, username: string) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      user_id: userId,
      id: userId,
      username: username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    }),
  );
  const signature = btoa("mock-signature");

  return `${header}.${payload}.${signature}`;
};


export const userHandlers = [
  // POST /auth/login
  http.post<never, LoginDTO, AuthSuccessResponse | ErrorResponse>(
    `${BASE}/auth/login`,
    async ({ request }) => {
      try {
        const live = await fetchWithTimeout(bypass(request.clone()));
        if (live.ok) {
          return live;
        }
      } catch (error) {
        console.info(
          "[MSW Fallback] POST /auth/login live request failed. Serving mock auth.",
          error,
        );
      }
      const body = await request.json();
      const validUser = usersState.find(
        (u) => u.username === body.username && u.password === body.password,
      );

      if (!validUser) {
        return HttpResponse.json(
          { message: "Invalid username or password" },
          { status: 401 },
        );
      }

      return HttpResponse.json({
        // token: `mock-jwt-token-${validUser.id}`,
        token: createMockJwt(validUser.id, validUser.username),
      });
    },
  ),

  // GET /users
  http.get<never, never, ApiUser[]>(`${BASE}/users`, async ({ request }) => {
    try {
      const live = await fetchWithTimeout(bypass(request));
      if (live.ok) {
        return live;
      }
    } catch (error) {
      console.info(
        "[MSW Fallback] GET /users live request failed. Serving mock users list.",
        error,
      );
    }
    return HttpResponse.json(usersState);
  }),

  // GET /users/:id
  http.get<IdParam, never, ApiUser | ErrorResponse>(
    `${BASE}/users/:id`,
    async ({ request, params }) => {
      try {
        const live = await fetchWithTimeout(bypass(request));
        if (live.ok) {
          return live;
        }
      } catch (error) {
        console.info(
          `[MSW Fallback] GET /users/${params.id} live request failed. Serving mock user detail.`,
          error,
        );
      }

      const targetId = Number(params.id);
      const user = usersState.find((u) => u.id === targetId);

      if (!user) {
        return HttpResponse.json(
          { message: `User with id ${targetId} not found` },
          { status: 404 },
        );
      }

      return HttpResponse.json(user);
    },
  ),

  // POST /users
  http.post<never, CreateUserDTO, ApiUser>(
    `${BASE}/users`,
    async ({ request }) => {
      const payload = (await request.json()) as CreateUserDTO;

      try {
        const live = await fetchWithTimeout(
          bypass(
            new Request(request.url, {
              method: "POST",
              headers: request.headers,
              body: JSON.stringify(payload),
            }),
          ),
        );
        if (live.ok) {
          return live;
        }
      } catch (error) {
        console.info(
          "[MSW Fallback] POST /users live request failed. Creating user in local mock state.",
          error,
        );
      }

      const nextId =
        usersState.length > 0
          ? Math.max(...usersState.map((u) => u.id)) + 1
          : 1;

      const createdUser: ApiUser = {
        ...payload,
        id: nextId,
      };

      usersState.push(createdUser);
      return HttpResponse.json(createdUser, { status: 201 });
    },
  ),

  // PUT /users/:id
  http.put<IdParam, UpdateUserDTO, ApiUser | ErrorResponse>(
    `${BASE}/users/:id`,
    async ({ request, params }) => {
      const payload = (await request.json()) as UpdateUserDTO;
      try {
         const live = await fetchWithTimeout(
           bypass(
             new Request(request.url, {
               method: "PUT",
               headers: request.headers,
               body: JSON.stringify(payload),
             }),
           ),
         );
         if (live.ok) {
           return live;
         }
        
      } catch (error) {
        console.info(`[MSW Fallback] PUT /users/${params.id} live request failed. Updating user in local mock state.`, error);
      }

      const targetId = Number(params.id);
      // const payload = await request.json();
      const index = usersState.findIndex((u) => u.id === targetId);

      if (index === -1) {
        return HttpResponse.json(
          { message: `User with id ${targetId} not found` },
          { status: 404 },
        );
      }

      const updatedUser: ApiUser = {
        ...usersState[index],
        ...payload,
        id: targetId,
      };

      usersState[index] = updatedUser;
      return HttpResponse.json(updatedUser);
    },
  ),

  // DELETE /users/:id
  http.delete<IdParam, never, ApiUser | ErrorResponse>(
    `${BASE}/users/:id`,
    async ({ request, params }) => {
      try {
        const live = await fetchWithTimeout(bypass(request));
        if (live.ok) {
          return live;
        }
      } catch (error) {
        console.info(
          `[MSW Fallback] DELETE /users/${params.id} live request failed. Deleting user from local mock state.`,
          error,
        );
      }
      
      const targetId = Number(params.id);
      const existingUser = usersState.find((u) => u.id === targetId);

      if (!existingUser) {
        return HttpResponse.json(
          { message: `User with id ${targetId} not found` },
          { status: 404 },
        );
      }

      usersState = usersState.filter((u) => u.id !== targetId);
      return HttpResponse.json(existingUser);
    },
  ),
];
