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
