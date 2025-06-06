import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Anivote by
        <a href="https://run.vote" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Runvote</a>
    </div>`
})
export class AppFooter {}
