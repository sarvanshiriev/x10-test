export function inputSpaces () {
    function formatNumberWithSpaces(number) {
        const str = number.toString();
        const s = str.length;
        const chars = str.split('');
        const strWithSpaces = chars.reduceRight((acc, char, i) => {
            const spaceOrNothing = ((((s - i) % 3) === 0) ? ' ' : '');
            return (spaceOrNothing + char + acc);
        }, '');
    
        return ((strWithSpaces[0] === ' ') ? strWithSpaces.slice(1) : strWithSpaces);
    }
    
const priceInput = document.getElementById('calculator__form-price');
const contributionInput = document.getElementById('calculator__form-contribution');

function formatInput(input) {
    const value = input.value.replace(/\s/g, ''); 
    const formattedValue = formatNumberWithSpaces(value);
    console.log(formattedValue);
    input.type = 'text';
    input.value = formattedValue;
    console.log(input.value);
}

formatInput(priceInput);
formatInput(contributionInput);
}
document.addEventListener('DOMContentLoaded',inputSpaces ());