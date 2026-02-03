// Mock Database of common drug interactions
const interactionDatabase = [
    {
        drugs: ['Aspirin', 'Ibuprofen'],
        severity: 'Moderate',
        description: 'Taking these together may increase the risk of side effects like stomach bleeding.',
    },
    {
        drugs: ['Warfarin', 'Aspirin'],
        severity: 'Severe',
        description: 'Increased risk of bleeding. Consult your doctor immediately.',
    },
    {
        drugs: ['Lisinopril', 'Potassium'],
        severity: 'Moderate',
        description: 'May cause high potassium levels in the blood.',
    },
    {
        drugs: ['Amoxicillin', 'Methotrexate'],
        severity: 'Severe',
        description: 'Amoxicillin can increase the toxicity of Methotrexate.',
    }
];

export function checkInteractions(newMedName, existingMedicines) {
    const warnings = [];

    existingMedicines.forEach(med => {
        const pair = [newMedName.toLowerCase(), med.name.toLowerCase()].sort();

        // Find matching interaction
        const interaction = interactionDatabase.find(entry => {
            const entryDrugs = entry.drugs.map(d => d.toLowerCase()).sort();
            return entryDrugs[0] === pair[0] && entryDrugs[1] === pair[1];
        });

        if (interaction) {
            warnings.push({
                pair: [newMedName, med.name],
                severity: interaction.severity,
                description: interaction.description
            });
        }
    });

    return warnings;
}
