document.addEventListener('DOMContentLoaded', () => {
  const totalVisitsEl = document.getElementById('totalVisits');
  const uniqueVisitorsEl = document.getElementById('uniqueVisitors');
  const recentVisitsTable = document.getElementById('recentVisitsTable');

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/v1/admin/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const { data } = await response.json();

      totalVisitsEl.textContent = data.total;
      uniqueVisitorsEl.textContent = data.unique;

      recentVisitsTable.innerHTML = ''; // Clear table
      data.recent.forEach(visit => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="p-2 border-b">${visit.ip_address}</td>
          <td class="p-2 border-b">${visit.city}, ${visit.country}</td>
          <td class="p-2 border-b text-sm text-gray-600">${visit.user_agent}</td>
          <td class="p-2 border-b">${new Date(visit.visited_at).toLocaleString()}</td>
        `;
        recentVisitsTable.appendChild(row);
      });
    } catch (error) {
      console.error(error);
      recentVisitsTable.innerHTML = `<tr><td colspan="4" class="text-red-500 p-2">Error loading data.</td></tr>`;
    }
  };

  fetchAnalytics();
});