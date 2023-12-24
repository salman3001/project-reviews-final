<script lang="ts" setup>
import StatisticsChart from 'src/components/admin/charts/StatisticsChart.vue'
import SubscribersChart from 'src/components/admin/charts/SubscribersChart.vue'
import PieChart from 'src/components/admin/charts/PieChart.vue'
</script>

<template>
  <q-page class="q-pa-lg q-col-gutter-lg">
    <p class="text-h6"><q-icon name="trending_up"></q-icon> Statistics</p>
    <div class="scroll hide-scrollbar">
      <div class="scrollbar-hide" style="min-width: 450px;max-width: 900px;">
        <StatisticsChart />
      </div>
    </div>
    <p class="text-h6"><q-icon name="group_add"></q-icon> Subscribers</p>

    <div class="scroll hide-scrollbar row q-pt-lg">
      <div style="min-width: 450px;max-width: 900px;">
        <SubscribersChart />
      </div>
      <div style="min-width: 450px;max-width: 900px;">
        <PieChart />
      </div>
    </div>

  </q-page>
</template>
