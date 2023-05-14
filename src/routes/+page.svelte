<script lang="ts">
	import { Button, Group, Loader, Stack, Text, TextInput } from '@svelteuidev/core'
	import { getMessageByHash, getMessageHash } from '../lib/api/Fetch.js'

	let request = ''
	let response = ''
	let errorText = ''
	let loading = false
	let messageMode = true

	function handleSubmit() {
		if (!request) {
			errorText = 'Field must be non empty'
		} else {
			loading = true
		}
	}

	function handleModeChange() {
		messageMode = !messageMode
		request = response
		response = ''
		errorText = ''
	}

	async function handleRequest() {
		if (messageMode) {
			response = await getMessageHash(request).then((resp) => {
				loading = false
				return resp
			})
		} else {
			response = await getMessageByHash(request).then((resp) => {
				loading = false
				return resp
			})
		}
	}
</script>

<div>
	<form novalidate>
		{#if loading}
			{#await handleRequest()}
				<Loader size="xl" />
			{:catch error}
				<Text>Something went wrong: [{error}]</Text>
			{/await}
		{:else}
			<Stack spacing={24} align="stretch">
				<TextInput
					placeholder={messageMode ? 'Enter message' : 'Enter hash'}
					label={messageMode ? 'Message' : 'Hash'}
					required
					bind:value={request}
					error={errorText}
					on:click={() => {
						errorText = ''
					}}
				/>
				<Group>
					{#if messageMode}
						<Text>Hash:</Text>
					{:else}
						<Text>Message:</Text>
					{/if}
					<Text align="center" underline>
						{response}
					</Text>
				</Group>
				<Group>
					<Button type="submit" ripple on:click={handleSubmit}>Submit</Button>
					<Button ripple on:click={handleModeChange}>Change mode</Button>
				</Group>
			</Stack>
		{/if}
	</form>
</div>

<style>
	div {
		margin-top: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
