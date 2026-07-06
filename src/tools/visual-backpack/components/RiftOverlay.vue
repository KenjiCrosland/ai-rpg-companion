<template>
  <Teleport to="body">
    <transition name="rift-fade">
      <div
        v-if="active"
        class="rift"
        role="alertdialog"
        aria-label="Astral rift warning"
        @click="$emit('close')"
      >
        <!-- The tear: a vertical portal that flashes open, glows, then seals. -->
        <div class="rift__tear" aria-hidden="true"></div>
        <div class="rift__glow" aria-hidden="true"></div>

        <!-- The doomed bag, sucked into the rift. -->
        <div class="rift__bag" aria-hidden="true">🎒</div>

        <!-- A few sparks pulled toward the tear. -->
        <span class="rift__spark rift__spark--a" aria-hidden="true">✦</span>
        <span class="rift__spark rift__spark--b" aria-hidden="true">✧</span>
        <span class="rift__spark rift__spark--c" aria-hidden="true">✦</span>

        <div class="rift__msg" aria-live="assertive">
          <p class="rift__title">Don't do that.</p>
          <p class="rift__sub">
            A bag of holding inside another tears a rift to the Astral Plane.
            Reality politely declines.
          </p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
/**
 * Easter egg: dropping a bag of holding into a bag of holding would (per the SRD)
 * rip a hole to the Astral Plane. Instead of stashing, we play this quick gag —
 * the screen tears, the bag gets sucked away, and a "don't do that" note flashes
 * before it auto-dismisses. The bag itself never moved, so it just stays put.
 */
import { watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  active: { type: Boolean, default: false },
});
const emit = defineEmits(['close']);

let timer = null;
watch(
  () => props.active,
  (on) => {
    clearTimeout(timer);
    if (on) timer = setTimeout(() => emit('close'), 4600);
  },
);
onBeforeUnmount(() => clearTimeout(timer));
</script>

<style scoped>
.rift {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* Cool astral dim that deepens toward the tear at center. */
  background: radial-gradient(circle at 50% 45%, rgba(40, 20, 70, 0.62), rgba(8, 10, 26, 0.86));
}

/* The tear — a tall lens that flashes open, holds a glowing seam, then seals. */
.rift__tear {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 62vh;
  border-radius: 50%;
  background: linear-gradient(180deg, transparent, #f4ecff 12%, #c9a8ff 50%, #f4ecff 88%, transparent);
  box-shadow: 0 0 24px 8px rgba(201, 168, 255, 0.9), 0 0 90px 30px rgba(126, 74, 210, 0.7);
  transform: translate(-50%, -50%) scaleY(0);
  animation: rift-tear 4.5s ease-in-out forwards;
}
.rift__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 46vh;
  height: 46vh;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.2);
  background: radial-gradient(circle, rgba(150, 100, 230, 0.5), transparent 65%);
  animation: rift-glow 4.5s ease-in-out forwards;
}

.rift__bag {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 6rem;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
  animation: rift-suck 1.5s cubic-bezier(0.5, 0, 0.85, 0.3) forwards;
}

.rift__spark {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #eaddff;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(201, 168, 255, 0.9);
  opacity: 0;
}
.rift__spark--a { animation: rift-spark 1.4s ease-in 0.1s forwards; --sx: -34vw; --sy: -22vh; }
.rift__spark--b { animation: rift-spark 1.5s ease-in 0.25s forwards; --sx: 30vw; --sy: 20vh; }
.rift__spark--c { animation: rift-spark 1.3s ease-in 0.4s forwards; --sx: 26vw; --sy: -26vh; }

.rift__msg {
  position: relative;
  z-index: 1;
  max-width: 34rem;
  margin-top: 34vh;
  text-align: center;
  color: #f4ecff;
  opacity: 0;
  animation: rift-msg 4.5s ease-out forwards;
}
.rift__title {
  margin: 0 0 0.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-shadow: 0 0 18px rgba(126, 74, 210, 0.8);
}
.rift__sub {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.5;
  color: #d9ccf0;
}

@keyframes rift-tear {
  0% { transform: translate(-50%, -50%) scaleY(0); width: 6px; opacity: 0; }
  12% { transform: translate(-50%, -50%) scaleY(1); width: 6px; opacity: 1; }
  30% { width: 26px; }
  70% { width: 20px; opacity: 1; }
  100% { transform: translate(-50%, -50%) scaleY(0); width: 4px; opacity: 0; }
}
@keyframes rift-glow {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
  25% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  70% { opacity: 0.7; }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
}
@keyframes rift-suck {
  0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
  55% { transform: translate(-50%, -50%) scale(0.5) rotate(300deg); opacity: 0.95; }
  100% { transform: translate(-50%, -50%) scale(0) rotate(680deg); opacity: 0; }
}
@keyframes rift-spark {
  0% { transform: translate(calc(-50% + var(--sx)), calc(-50% + var(--sy))) scale(1); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
}
@keyframes rift-msg {
  /* Appear quickly (~1.2s in), then HOLD readable for the extra ~2s before fading. */
  0% { opacity: 0; transform: translateY(10px); }
  18% { opacity: 0; transform: translateY(10px); }
  27% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

.rift-fade-enter-active { transition: opacity 0.15s ease; }
.rift-fade-leave-active { transition: opacity 0.4s ease; }
.rift-fade-enter-from,
.rift-fade-leave-to { opacity: 0; }

/* Respect reduced-motion: skip the tear/suck theatrics, just show the note. */
@media (prefers-reduced-motion: reduce) {
  .rift__tear,
  .rift__glow,
  .rift__spark { display: none; }
  .rift__bag { animation: none; opacity: 0.85; }
  .rift__msg { animation: none; opacity: 1; }
}
</style>
