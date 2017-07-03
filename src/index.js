/**
 * Created by TataraYuuyami on 2017/4/15.
 */

import portfolio from './yaml/portfolio.yml';
import structure from './yaml/structure.yml';

import './css/base.css';
import './css/main.css';

function generateHtmlString(stru, portfo, isRoot) {
    let resultString = '';
    Object.entries(stru).forEach((entryItem) => {
        const
            key = entryItem[0],
            value = entryItem[1],
            portfoValue = portfo[key];
        resultString += isRoot ? '<div class="section">' : '';
        if (portfoValue !== undefined) {
            if (typeof value === 'string') {
                resultString +=
                    `
                        <div class="entry ${ key }" title="${ value }">
                            <div class="entry_name">${ value }:</div>
                            <div class="entry_detail">${ !!portfoValue ? portfoValue : '' }</div>
                        </div>
                    `;
            } else if (typeof value === 'object') {
                if (Array.isArray(portfoValue)) {
                    resultString +=
                        `<div class="entry ${ key }">`;
                    resultString +=
                            `<ul>`;
                    portfoValue.forEach((list_entry) => {
                        resultString +=
                                `<li>${ generateHtmlString(value, list_entry) }</li>`;
                    });
                    resultString +=
                            `</ul>`;
                    resultString +=
                        `</div>`;
                } else {
                    resultString += `<div class="${ key }">${ generateHtmlString(value, portfoValue) }</div>`;
                }
            }
        }
        resultString += isRoot ? '</div>' : '';
    });
    return resultString;
}

const htmlString = generateHtmlString(structure, portfolio, true);
document.querySelector('.portfolio_container').innerHTML = htmlString;