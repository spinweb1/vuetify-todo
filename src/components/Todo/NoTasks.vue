<template>
    <div class="pa-6 no-tasks">
        <v-icon
          large
          color="green darken-2"
        >
          mdi-check
        </v-icon>
        <div class="pl-1">
          <h3>No tasks yet!</h3>
        </div>
    </div>
</template>

<style>
.no-tasks {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>