<script lang="ts">
    export let title = "";
  </script>
  
  <div class="card">
    <slot name="header">
      <div class="card-header">
        <h3>{title}</h3>
      </div>
    </slot>
    <slot name="content" class="card-content"></slot>
  </div>