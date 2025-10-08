# Fix Stale “Assigned to” on Closed Incidents

## Overview
In ServiceNow, it’s possible that **resolved or closed incidents** still have the *Assigned to* field populated.  
This can cause confusion in reporting, skew SLA metrics, and misrepresent workload ownership.  
This script clears the `assigned_to` field for all resolved incidents to keep data clean and accurate.

---

## Use Case
- Some incidents remain in a *Resolved (state=6)* condition.
- These incidents still have an **Assigned to** user even though work is complete.
- The script clears the `assigned_to` field for all such records.

---

## 💻 Script Function

```javascript
function clearAssignedToOnClosedIncidents() {
    var count = 0;
    var inc = new GlideRecord('incident');
    inc.addQuery('state', '6'); // Resolved
    inc.addQuery('assigned_to', '!=', '');
    inc.query();
    
    while (inc.next()) {
        inc.assigned_to = '';
        inc.update();
        count++;
    }
    
    gs.info('Cleared assigned_to for ' + count + ' resolved incidents.');
    return count;
}

// Run the function
clearAssignedToOnClosedIncidents();
