<script lang="ts">
     import { Accordion } from '@skeletonlabs/skeleton-svelte';

     let value = $state(['']);

     const whatIs = "Keep It Simple [stupid] is an online dictionary for programming and computer science terminology. It is driven by user submissions, which can be voted on and are moderated by a team of admins. Where a programming-relevant term is not already in the dictionary, an LLM will generate the term for the user. Other users can later edit this LLM generation."
     const whySignUp = "Keep It Simple needs its users! The idea is for the app to be driven by a user community actively contributing term definitions. The scope is wide - pretty much any term related to computer science can be accepted."
     const whyUseIt = "The app is not intended to replace documentation, Google-Fu, asking colleagues, or indeed using LLMs. It's here to provide, short, snappy, uniform-format definitions to act as quick reminders. It can help augment other research, such as navigating very technical documentation."
     const dontWantToSignUp = "No problem! Any user can use the search function, the core of the app. Just sign up to start making your own contributions, voting, and creating collections of terms."
     const termExists = "Search a term and see it's already there, and think it needs some work? Add your own definition. As a standard user, admins will review your submission and approve or deny it replacing the published definition. Certain powerusers can directly replace definitions too."


</script>


<Accordion {value} onValueChange={(e) => (value = e.value)} multiple>
<Accordion.Item value="whatIs">
  {#snippet control()}What is Keep It Simple?{/snippet}
  {#snippet panel()}{whatIs}{/snippet}
</Accordion.Item>
<hr class="hr" />
<Accordion.Item value="whySignUp">
  {#snippet control()}Why should I sign up?{/snippet}
  {#snippet panel()}{whySignUp}{/snippet}
</Accordion.Item>
<hr class="hr" />
<Accordion.Item value="whyUseIt">
  {#snippet control()}There's lots of programming resources online. Why use this?{/snippet}
  {#snippet panel()}{whyUseIt}{/snippet}
</Accordion.Item>
<hr class="hr" />
<Accordion.Item value="dontWantToSignUp">
  {#snippet control()}The search bar is already available. Why sign up?{/snippet}
  {#snippet panel()}{dontWantToSignUp}{/snippet}
</Accordion.Item>
<hr class="hr" />
<Accordion.Item value="termExists">
  {#snippet control()}I see a definition there but I don't like it.{/snippet}
  {#snippet panel()}{termExists}{/snippet}
</Accordion.Item>
</Accordion>