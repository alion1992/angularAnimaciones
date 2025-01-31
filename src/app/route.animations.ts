import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    slidePages('Home', 'Books', 'right'),
    slidePages('Books', 'Home', 'left'),
    
  ]);


function slidePages(fromPage: string, toPage: string, direction: 'left' | 'right') {
  return transition(`${fromPage} => ${toPage}`, [
    style({position: 'relative'}),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
        opacity: 1,
      })
    ], {optional: true}),
    query(':enter', [
      style({[direction]: '-100%'})
    ], {optional: true}),
    query(':leave', animateChild(), {optional: true}),
    group([
      query(':leave', [
        animate('1000ms ease-out', style({[direction]: '100%'}))
      ], {optional: true}),
      query(':enter', [
        animate('1000ms ease-out', style({[direction]: '0%'}))
      ], {optional: true}),
    ]),
  ])
}

export const flipAnimation =
  trigger('routeAnimations', [
    flipPages('Home', 'Books'),
    flipPages('Books', 'Home'),
  ]);

function flipPages(fromPage: string, toPage: string) {
  return transition(`${fromPage} => ${toPage}`, [
    style({ position: 'relative', perspective: '1000px' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden'
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'rotateY(-180deg)', opacity: 0 })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('700ms ease-in', style({ transform: 'rotateY(180deg)', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('700ms ease-out', style({ transform: 'rotateY(0deg)', opacity: 1 }))
      ], { optional: true }),
    ]),
  ]);
}
