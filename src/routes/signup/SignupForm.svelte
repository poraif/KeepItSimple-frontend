<script lang="ts">
    import { apiService } from '$lib/services/api-service';
    import type { UserSignup } from '$lib/entity-types';
	import { goto } from '$app/navigation';
    import { toaster } from '$lib/stores';

	let username = $state("");
	let email = $state("");
	let password = $state("");

	const doSignup = async (): Promise<void> => {
		const userSignup: UserSignup = {
			username: username.toLowerCase().trim(),
			email: email.toLowerCase().trim(),
			password: password
		};
        if (!username || !email || !password) {
            toaster.error({ title: 'Please fill in all fields.' });
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
		toaster.error({ title: "email is not in right format" });
		return;
	    }
		const success = await apiService.signup(userSignup);
        if (success) {
            toaster.success({ title: 'Account created successfully!' });
            console.log("Signup successful");
            goto('/login');
        } else {
            toaster.error({ title: 'Signup failed. Please try again.' });
            console.log("Signup failed");
        }
        goto('/login');
	};

</script>

<div class="card mx-auto max-w-sm p-6 shadow-lg rounded-lg border border-gray-200">
    <div class="card-header mb-4">
        <h3 class="text-2xl font-semibold">Sign up</h3>
    </div>
    <div class="card-content">
        <p class="mb-4 text-gray-600">Enter details below to sign up</p>
        <div class="grid gap-4">
            <div class="grid gap-2">
                <label for="username" class="text-sm font-medium">Username</label>
                <input id="username" type="text" placeholder="joebloggs666" required bind:value={username}
                    class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="grid gap-2">
                <label for="email" class="text-sm font-medium">Email</label>
                <input id="email" type="email" placeholder="joebloggs@gmail.com" required bind:value={email}
                    class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="grid gap-2">
                <label for="password" class="text-sm font-medium">Password</label>
                <input id="password" type="password" required bind:value={password}
                    class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <button type="submit" onclick={doSignup}
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Sign up
            </button>
        </div>
    </div>
</div>