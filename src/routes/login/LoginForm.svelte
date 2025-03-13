<script lang="ts">
    import { apiService } from '$lib/services/api-service';
    import type { UserLogin } from '$lib/entity-types';

	let username = $state("");
	let password = $state("");

	const doLogin = (): void => {
		const userLogin: UserLogin = {
			username: username,
			password: password
		};
		apiService.login(userLogin);
	};

</script>

<div class="card mx-auto max-w-sm p-6 shadow-lg rounded-lg border border-gray-200">
    <div class="card-header mb-4">
        <h3 class="text-2xl font-semibold">Login</h3>
        <p class="text-gray-600">Enter details below to log in</p>
    </div>
    <div class="card-content">
        <div class="grid gap-4">
            <div class="grid gap-2">
                <label for="username" class="text-sm font-medium">Username</label>
                <input id="username" type="text" placeholder="joebloggs666" required bind:value={username}
                    class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="grid gap-2">
                <label for="password" class="text-sm font-medium">Password</label>
                <input id="password" type="password" required bind:value={password}
                    class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <button type="submit" onclick={doLogin}
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Log in
            </button>
        </div>
        <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="/signup" class="underline text-blue-600 hover:text-blue-700">Sign up</a>
        </div>
    </div>
</div>