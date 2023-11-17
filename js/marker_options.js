/*
To add a new marker type, copy the structure of an existing json object below, then replace the name, and svg values as appropriate. svg icons can be found at https://icons.getbootstrap.com/
Note: svg icons can be graphically edited from https://editor.method.ac/ by pasting the svg xml into the view>source text area and applying changes, then copying back into this document
*/


var marker_options = {
"default":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>'
},
"person":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/></svg>'
},
"lock":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock" viewBox="0 0 16 16"><path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z"/><path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/></svg>',
},
"electrical":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-outlet" viewBox="0 0 16 16"><path d="M3.34 2.994c.275-.338.68-.494 1.074-.494h7.172c.393 0 .798.156 1.074.494.578.708 1.84 2.534 1.84 5.006 0 2.472-1.262 4.297-1.84 5.006-.276.338-.68.494-1.074.494H4.414c-.394 0-.799-.156-1.074-.494C2.762 12.297 1.5 10.472 1.5 8c0-2.472 1.262-4.297 1.84-5.006zm1.074.506a.376.376 0 0 0-.299.126C3.599 4.259 2.5 5.863 2.5 8c0 2.137 1.099 3.74 1.615 4.374.06.073.163.126.3.126h7.17c.137 0 .24-.053.3-.126.516-.633 1.615-2.237 1.615-4.374 0-2.137-1.099-3.74-1.615-4.374a.376.376 0 0 0-.3-.126h-7.17z"/><path d="M6 5.5a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM7 10v1h2v-1a1 1 0 0 0-2 0z"/></svg>',
},
"elevator":{"svg":'<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="bi bi-outlet" fill="currentColor"><path stroke="#000000" id="svg_1" stroke-miterlimit="4" stroke-width="0.60625" fill="#ffffff" d="m3.46777,14.663c-0.36146,0 -0.65475,-0.328 -0.65475,-0.73288l0,-10.25922c0,-0.40459 0.29329,-0.73288 0.65475,-0.73288l9.16575,0c0.36121,0 0.6545,0.32829 0.6545,0.73288l0,10.25922c0,0.40488 -0.29329,0.73288 -0.6545,0.73288l-9.16575,0z"/><path stroke="null" id="svg_2" fill-rule="nonzero" fill="#000000" d="m10.37395,8.20089l0,4.88505l-4.91039,0l0,-4.88505l4.91039,0zm0,4.88505zm-5.48956,-5.46478l0,6.04423l6.06901,0l0,-6.04423l-6.06901,0l0,0z"/><path stroke="null" id="svg_3" fill-rule="nonzero" fill="#000000" d="m7.73265,5.90956l0,-0.69095l-1.10456,1.10428l0,-2.34651l-0.55186,0l0,2.34651l-1.10456,-1.10428l0,0.69095l1.3802,1.38048l1.38077,-1.38048"/><path stroke="null" id="svg_4" fill-rule="nonzero" fill="#000000" d="m9.22097,4.87117l0,2.34651l0.55214,0l0,-2.34651l1.10456,1.10484l0,-0.69123l-1.38048,-1.38048l-1.38048,1.38048l0,0.69123l1.10428,-1.10484"/><path stroke="null" id="svg_5" fill-rule="nonzero" fill="#000000" d="m5.7913,11.23666l0.18836,0l0,1.56462l0.30183,0l0.10953,-1.56462l0.05519,0l0.10981,1.56462l0.30183,0l0,-1.56462l0.18808,0l0.0549,-1.04881c0.0152,-0.2123 -0.13543,-0.40432 -0.3497,-0.43585c-0.1084,-0.01605 -0.21933,-0.02478 -0.33252,-0.02478c-0.11291,0 -0.22412,0.00873 -0.33252,0.02478c-0.21427,0.03153 -0.3649,0.22356 -0.34998,0.43585l0.05519,1.04881"/><path stroke="null" id="svg_6" fill-rule="nonzero" fill="#000000" d="m6.41861,9.60897c0.15148,0 0.27424,-0.12276 0.27424,-0.27452c0,-0.15176 -0.12276,-0.27424 -0.27424,-0.27424c-0.15176,0 -0.2748,0.12248 -0.2748,0.27424c0,0.15176 0.12304,0.27452 0.2748,0.27452"/><path stroke="null" id="svg_7" fill-rule="nonzero" fill="#000000" d="m7.3058,11.23666l0.18808,0l0,1.56462l0.30211,0l0.10981,-1.56462l0.0549,0l0.10953,1.56462l0.30211,0l0,-1.56462l0.18836,0l0.05519,-1.04881c0.01464,-0.2123 -0.13599,-0.40432 -0.3497,-0.43585c-0.10896,-0.01605 -0.2199,-0.02478 -0.3328,-0.02478c-0.11319,0 -0.2244,0.00873 -0.3328,0.02478c-0.21399,0.03153 -0.3649,0.22356 -0.34998,0.43585l0.05519,1.04881"/><path stroke="null" id="svg_8" fill-rule="nonzero" fill="#000000" d="m7.9334,9.60897c0.15176,0 0.27424,-0.12276 0.27424,-0.27452c0,-0.15176 -0.12248,-0.27424 -0.27424,-0.27424c-0.15176,0 -0.27452,0.12248 -0.27452,0.27424c0,0.15176 0.12276,0.27452 0.27452,0.27452"/><path stroke="null" id="svg_9" fill-rule="nonzero" fill="#000000" d="m8.82059,11.23666l0.18836,0l0,1.56462l0.30183,0l0.10981,-1.56462l0.0549,0l0.10981,1.56462l0.30183,0l0,-1.56462l0.18836,0l0.0549,-1.04881c0.0152,-0.2123 -0.13543,-0.40432 -0.34942,-0.43585c-0.10896,-0.01605 -0.2199,-0.02478 -0.3328,-0.02478c-0.11319,0 -0.2244,0.00873 -0.3328,0.02478c-0.21399,0.03153 -0.36462,0.22356 -0.3497,0.43585l0.0549,1.04881"/><path stroke="null" id="svg_10" fill-rule="nonzero" fill="#000000" d="m9.44791,9.60897c0.15148,0 0.27452,-0.12276 0.27452,-0.27452c0,-0.15176 -0.12304,-0.27424 -0.27452,-0.27424c-0.15176,0 -0.27452,0.12248 -0.27452,0.27424c0,0.15176 0.12276,0.27452 0.27452,0.27452"/></svg>',
},
"custodial":{"svg":'<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="bi bi-outlet" fill="currentColor"><path  d="m9.82326,8.66216c0.03434,-0.15198 0.03003,-0.30827 -0.00929,-0.45527c-0.06272,-0.2341 -0.21502,-0.44432 -0.44116,-0.57489c-0.22564,-0.13024 -0.4838,-0.15662 -0.71791,-0.09407l1.16836,1.12423zm-4.11083,-1.47414c-0.15513,0 -0.28106,-0.12593 -0.28106,-0.28106c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106l0.27425,0c0.15513,0 0.28106,0.12593 0.28106,0.28106c0,0.15513 -0.12593,0.28106 -0.28106,0.28106l-0.27425,0zm-1.32166,0c-0.15513,0 -0.28106,-0.12593 -0.28106,-0.28106c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106l0.27425,0c0.15513,0 0.28106,0.12593 0.28106,0.28106c0,0.15513 -0.12593,0.28106 -0.28106,0.28106l-0.27425,0zm0.51699,0.24273c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106c0.15513,0 0.28106,0.12593 0.28106,0.28106l0,0.27425c0,0.15513 -0.12593,0.28106 -0.28106,0.28106c-0.15513,0 -0.28106,-0.12593 -0.28106,-0.28106l0,-0.27425zm0,-1.32183c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106c0.15513,0 0.28106,0.12593 0.28106,0.28106l0,0.27425c-0.43619,0.28106 -0.56211,0.15513 -0.56211,0l0,-0.27425zm6.7525,6.69642c-0.15513,0 -0.28106,-0.12593 -0.28106,-0.28106c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106l0.27425,0c0.15513,0 0.28106,0.12593 0.28106,0.28106c0,0.15513 -0.12593,0.28106 -0.28106,0.28106l-0.27425,0zm-1.32166,0c-0.15513,0 -0.28106,-0.12593 -0.28106,-0.28106c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106l0.27425,0c0.15513,0 0.28106,0.12593 0.28106,0.28106c0,0.15513 -0.12593,0.28106 -0.28106,0.28106l-0.27425,0zm0.51699,0.24273c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106c0.15513,0 0.28106,0.12593 0.28106,0.28106l0,0.27425c0,0.15513 -0.12593,0.28106 -0.28106,0.28106c-0.15513,0 -0.28106,-0.12593 -0.28106,-0.28106l0,-0.27425zm0,-1.32183c0,-0.15513 0.12593,-0.28106 0.28106,-0.28106c0.15513,0 0.28106,0.12593 0.28106,0.28106l0,0.27425c0,0.15513 -0.12593,0.28106 -0.28106,0.28106c-0.15513,0 -0.28106,-0.12593 -0.28106,-0.28106l0,-0.27425zm-6.15421,-1.20154c0.14484,-0.05442 0.30661,0.01875 0.36103,0.16359c0.05442,0.14484 -0.01875,0.30661 -0.16359,0.36103c-0.29151,0.11 -0.5714,0.18201 -0.86026,0.22382c-0.1903,0.02771 -0.38558,0.04214 -0.59181,0.04579c0.09673,0.24688 0.22282,0.48264 0.37563,0.70181c0.51599,-0.00979 1.01937,-0.12742 1.47911,-0.33913c0.50106,-0.23062 0.95035,-0.5729 1.30889,-1.00809c0.09822,-0.11929 0.27475,-0.13655 0.39404,-0.03833c0.11929,0.09822 0.13655,0.27475 0.03833,0.39404c-0.41412,0.50272 -0.93127,0.89693 -1.50632,1.16172c-0.3957,0.18217 -0.81978,0.30362 -1.25762,0.35787l0.03882,0.036c0.26529,0.24174 0.56377,0.43685 0.88282,0.58153c0.25036,-0.08661 0.47352,-0.18101 0.68124,-0.29333c0.22133,-0.11979 0.42623,-0.26115 0.62947,-0.43685c0.11697,-0.10121 0.294,-0.08843 0.3952,0.02854c0.10121,0.11697 0.08843,0.294 -0.02854,0.3952c-0.23543,0.20358 -0.47335,0.36766 -0.73068,0.50686c-0.03501,0.01891 -0.07051,0.03733 -0.10618,0.05541c0.3738,0.06222 0.76005,0.06205 1.14231,-0.00498c0.6975,-0.51533 1.27255,-1.16471 1.69696,-1.89987c0.40516,-0.70198 0.6741,-1.4831 0.78245,-2.30188l-1.78141,-1.028c-0.63661,0.60293 -1.38089,1.06831 -2.18507,1.37791c-0.78543,0.30229 -1.62761,0.45576 -2.48272,0.44365c-0.00548,0.25368 0.01775,0.50537 0.06786,0.75059c0.23958,0.00199 0.46207,-0.01062 0.67825,-0.04198c0.2492,-0.036 0.4906,-0.09805 0.7418,-0.19296zm5.53386,-1.37459c-0.10519,0.94338 -0.40533,1.84396 -0.86988,2.6483c-0.47385,0.82061 -1.11908,1.54249 -1.90335,2.11008c-0.03235,0.02339 -0.07002,0.04032 -0.11183,0.04828c-0.61139,0.11896 -1.23373,0.08959 -1.81808,-0.07433c-0.58468,-0.16409 -1.13169,-0.46306 -1.5921,-0.88282c-0.46107,-0.42026 -0.80949,-0.93741 -1.02684,-1.50417c-0.21536,-0.56195 -0.30196,-1.17433 -0.2424,-1.79153c0.0083,-0.1538 0.14169,-0.27309 0.29533,-0.26447c0.8727,0.04894 1.73446,-0.09009 2.53034,-0.39637c0.7851,-0.30213 1.50848,-0.76801 2.11722,-1.37691c0.20922,-0.34294 0.53524,-0.57373 0.89626,-0.67045c0.0803,-0.0214 0.16226,-0.03633 0.24522,-0.0443l2.95906,-5.12522c0.12062,-0.20988 0.31573,-0.35057 0.53208,-0.40848c0.2059,-0.05508 0.43254,-0.03534 0.63462,0.07134c0.01775,0.00763 0.03468,0.01692 0.05044,0.02787c0.19777,0.12128 0.33133,0.31092 0.38757,0.5203c0.05575,0.20839 0.03501,0.43768 -0.07433,0.64125c-0.00747,0.01626 -0.01643,0.03169 -0.02671,0.04612l-2.94595,5.10232c0.03468,0.07599 0.06272,0.15463 0.08428,0.23493c0.09457,0.3529 0.06089,0.7413 -0.12095,1.08822zm-0.32453,-1.81658l2.83562,-4.91269c0.04281,-0.07416 0.05127,-0.16027 0.03036,-0.23858c-0.02091,-0.07831 -0.07167,-0.14882 -0.14634,-0.19196c-0.07416,-0.04297 -0.1606,-0.05143 -0.23908,-0.03036c-0.07831,0.02091 -0.14882,0.07151 -0.19196,0.14617l-2.83612,4.91136c0.09938,0.03219 0.19661,0.07516 0.29068,0.12941c0.09374,0.05409 0.17935,0.11697 0.25683,0.18665z" opacity="undefined" stroke="null"/></svg>',
},

"grounds":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/></svg>',
},

"HVAC":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16"><path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"/>  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/></svg>',
},
"pest":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug-fill" viewBox="0 0 16 16"><path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z"/><path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z"/></svg>',
},
"plumbing":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/></svg>',
},
"moves":{"svg":'<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" ><path stroke="null" id="svg_4" d="m14.59325,7.26428l-5.07399,0l0,-5.91966c0,-0.15566 -0.1262,-0.28189 -0.28189,-0.28189l-7.89288,0c-0.15569,0 -0.28189,0.12623 -0.28189,0.28189l0,13.24876c0,0.15566 0.1262,0.28189 0.28189,0.28189l7.47004,0c0.15569,0 0.28189,-0.12623 0.28189,-0.28189l0,-0.84567l3.38266,0l0,0.84567c0,0.15566 0.1262,0.28189 0.28189,0.28189l0.98661,0c0.15569,0 0.28189,-0.12623 0.28189,-0.28189l0,-0.84567l0.14095,0c0.15569,0 0.28189,-0.12623 0.28189,-0.28189l0,-4.65116l0.14095,0c0.15569,0 0.28189,-0.12623 0.28189,-0.28189l0,-0.98661c0,-0.15566 -0.1262,-0.28189 -0.28189,-0.28189l-0.00001,0.00001zm-9.58421,7.04721l-3.38266,0l0,-2.39605l3.38266,0l0,2.39605zm0,-2.95983l-3.38266,0l0,-9.72515l3.38266,0l0,9.72515zm2.537,2.95983l-1.97322,0l0,-12.68498l3.38266,0l0,5.63777l-2.11416,0c-0.15569,0 -0.28189,0.12623 -0.28189,0.28189l0,0.98661c0,0.15566 0.1262,0.28189 0.28189,0.28189l0.28189,0l0,4.65116c0,0.15566 0.1262,0.28189 0.28189,0.28189l0.14095,0l0,0.56378l-0.00001,-0.00001zm0.98661,0l-0.42283,0l0,-0.56378l0.42283,0l0,0.56378zm4.93305,0l-0.42283,0l0,-0.56378l0.42283,0l0,0.56378zm0.42283,-1.12756l-6.20155,0l0,-1.97322l6.20155,0l0,1.97322zm0,-2.537l-6.20155,0l0,-1.83228l6.20155,0l0,1.83228zm0.42283,-2.39605l-7.18816,0l0,-0.42283l7.18816,0l0,0.42283z"/><rect stroke="null" id="svg_5" height="0.56378" width="0.84567" y="9.37844" x="10.36492"/><rect stroke="null" id="svg_6" height="0.56378" width="0.84567" y="11.77449" x="10.36492"/><rect stroke="null" id="svg_7" height="1.12756" width="0.56378" y="5.57294" x="6.13659"/><rect stroke="null" id="svg_8" height="1.12756" width="0.56378" y="5.57294" x="3.88149"/><rect stroke="null" id="svg_9" height="0.56378" width="0.84567" y="12.7611" x="2.89488"/></svg>'
},
"safety":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cone-striped" viewBox="0 0 16 16"><path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z"/></svg>',
},


"vandalism":{"svg":'<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve"><path stroke="null" d="m7.47558,4.26559c-1.21235,0.64483 -2.4247,1.28967 -3.63705,1.9345c1.11177,-0.16258 2.22092,-0.34139 3.32642,-0.53989c0.25913,-0.04653 0.36815,0.24425 0.17108,0.38955c-0.01379,0.01016 -0.02835,0.01925 -0.04218,0.02936c0.01258,0.07595 -0.01403,0.16075 -0.09587,0.22109c-0.5524,0.40728 -1.1396,0.76619 -1.75237,1.08178c-0.30387,0.1689 -0.61271,0.3298 -0.92978,0.47609c-0.25662,0.1184 -0.48159,-0.24926 -0.22412,-0.36806c0.10218,-0.04714 0.20175,-0.09892 0.30263,-0.14838c0.01818,-0.02243 0.0432,-0.04239 0.07691,-0.05794c0.01276,-0.00589 0.02505,-0.0126 0.03779,-0.01852c-0.03138,-0.08448 -0.01007,-0.18102 0.10026,-0.23193c0.17951,-0.08282 0.35624,-0.17065 0.53167,-0.26067c-1.19218,0.19694 -2.38787,0.37401 -3.58678,0.52943c-0.23126,0.02998 -0.41005,-0.26244 -0.17108,-0.38955c0.11312,-0.06017 0.22624,-0.12034 0.33936,-0.1805c0.01181,-0.00918 0.02516,-0.01783 0.04018,-0.02582c0.01255,-0.00668 0.0251,-0.01335 0.03765,-0.02002c-0.03002,-0.08043 -0.00847,-0.17252 0.10041,-0.23043c1.17687,-0.62596 2.35372,-1.25191 3.53059,-1.87787c-1.35503,0.21994 -2.71004,0.43986 -4.06507,0.65979c-0.24879,0.04038 -0.3839,-0.24901 -0.17109,-0.38955c0.13732,-0.09068 0.27582,-0.17969 0.41349,-0.26988c-0.0025,-0.06672 0.02765,-0.13641 0.10411,-0.18689c1.08207,-0.71456 2.17592,-1.41246 3.27916,-2.09643c-1.20825,0.14873 -2.40739,0.36028 -3.59249,0.63386c-0.27818,0.06421 -0.39577,-0.34692 -0.11804,-0.41104c0.0747,-0.01724 0.14973,-0.03299 0.22455,-0.04974c0.01089,-0.0679 0.05595,-0.12837 0.14382,-0.15285c-0.02976,-0.1029 0.01012,-0.22207 0.14923,-0.25418c1.61396,-0.37258 3.25487,-0.62972 4.90779,-0.77569c0.23182,-0.02047 0.285,0.29316 0.11206,0.39716c-0.01359,0.00817 -0.02704,0.01654 -0.04063,0.02472c0.01246,0.08426 -0.01713,0.17744 -0.09743,0.22574c-1.19949,0.7213 -2.38699,1.46076 -3.56251,2.21745c1.50128,-0.24367 3.00257,-0.48733 4.50385,-0.73101c0.23534,-0.0382 0.40487,0.2652 0.17109,0.38954c-0.01257,0.00669 -0.02513,0.01336 -0.0377,0.02005c0.0281,0.08134 0.00542,0.17414 -0.10036,0.2304c-0.11344,0.06034 -0.2269,0.12068 -0.34034,0.18102c-0.01155,0.00905 -0.02458,0.01753 -0.0392,0.0253zm6.88797,9.72809l-4.07081,0.87499c-0.03267,0.00708 -0.06548,0.01055 -0.098,0.01055c-0.08326,0 -0.16493,-0.02262 -0.23692,-0.06646c-0.10017,-0.06091 -0.16956,-0.15568 -0.19543,-0.26683l-1.86368,-7.98905c-0.00122,-0.00519 -0.00111,-0.01041 -0.00202,-0.01561c-0.02459,-0.00737 -0.04856,-0.01721 -0.0709,-0.0308c-0.06678,-0.04065 -0.11311,-0.10386 -0.13038,-0.17795l-0.05666,-0.24282c-0.03563,-0.15298 0.06497,-0.30526 0.22427,-0.33946l0.09391,-0.02019c0.10232,-0.48324 0.35846,-0.88822 0.71541,-1.1598c-0.01049,-0.02014 -0.01948,-0.04124 -0.02485,-0.06417l-0.06461,-0.27744c-0.01734,-0.07396 -0.00361,-0.15006 0.03874,-0.21424c0.04235,-0.0641 0.10812,-0.10858 0.18531,-0.12516l0.00699,-0.0015l-0.22945,-0.98325c-0.05348,-0.22943 0.09743,-0.45775 0.33622,-0.50916l1.14209,-0.24546c0.11521,-0.02498 0.23446,-0.00513 0.33478,0.05599c0.10032,0.06098 0.1697,0.15575 0.19558,0.26689l0.22935,0.98324l0.00685,-0.00147c0.07719,-0.01644 0.1564,-0.00333 0.22333,0.03733c0.06678,0.04065 0.11304,0.10393 0.13024,0.17809l0.06476,0.27709c0.00534,0.0228 0.00672,0.0457 0.00624,0.06848c0.44347,0.09954 0.85498,0.36089 1.1622,0.75601l0.09391,-0.02019c0.15872,-0.03413 0.31772,0.06223 0.35357,0.21514l0.05666,0.24296c0.01735,0.07409 0.00361,0.1502 -0.03888,0.21438c-0.01413,0.02138 -0.03166,0.03962 -0.05057,0.05632c0.00156,0.00524 0.00407,0.00997 0.00533,0.01535l1.86368,7.98912c0.05348,0.2295 -0.09743,0.45775 -0.33622,0.50909zm-4.13557,0.59776l4.07081,-0.87499c0.03859,-0.00832 0.07155,-0.03053 0.09266,-0.06258c0.02125,-0.03205 0.02804,-0.07007 0.01951,-0.10712l-0.0462,-0.19804l-4.35974,0.93708l0.04618,0.19797c0.00867,0.03719 0.0318,0.06868 0.06519,0.08908c0.03339,0.02026 0.07242,0.02678 0.11159,0.01859zm-1.2917,-10.14753l2.02239,-0.43479l0.00029,0l-0.0649,-0.27723l-2.02239,0.43472l0.06461,0.2773zm-0.06302,-1.60151l0.22945,0.98325l1.43092,-0.30758l-0.22933,-0.9833c-0.00867,-0.03705 -0.0318,-0.06861 -0.06519,-0.08894c-0.024,-0.01457 -0.05132,-0.02213 -0.07892,-0.02213c-0.01084,0 -0.02183,0.00118 -0.03267,0.00347l-1.14209,0.24553c-0.07965,0.01707 -0.12995,0.09324 -0.11217,0.1697zm-0.59507,2.81858l3.81658,-0.8204c-0.28099,-0.31524 -0.6429,-0.51306 -1.02348,-0.56918c-0.01544,0.00607 -0.03123,0.01152 -0.04785,0.0151l-2.02239,0.43472c-0.01644,0.00352 -0.03274,0.00439 -0.049,0.00521c-0.31993,0.20655 -0.55966,0.5339 -0.67385,0.93455zm1.66215,8.34757l4.35974,-0.93708l-1.74765,-7.4917l-4.35975,0.93716l1.74766,7.49163zm-1.95598,-7.73813l4.64691,-0.99883l-0.05652,-0.24289l-4.64705,0.99883l0.05666,0.24289zm1.9074,2.63746l2.18602,-0.46996c0.04785,-0.01041 0.07806,-0.05592 0.06736,-0.10185c-0.01084,-0.04607 -0.05912,-0.07507 -0.1061,-0.06466l-2.18602,0.46996c-0.04785,0.01041 -0.07806,0.05592 -0.06736,0.10185c0.00925,0.03968 0.04597,0.06674 0.08659,0.06674c0.00651,0 0.01301,-0.00069 0.01951,-0.00208zm0.07936,0.33995l2.18588,-0.46983c0.04785,-0.01041 0.07806,-0.05592 0.06736,-0.10185c-0.0107,-0.04607 -0.05927,-0.07493 -0.1061,-0.06466l-2.18588,0.46983c-0.04785,0.01041 -0.07806,0.05592 -0.06736,0.10185c0.00925,0.03968 0.04597,0.06674 0.08659,0.06674c0.0065,0 0.01301,-0.00069 0.01951,-0.00208zm0.07921,0.33995l2.18602,-0.46983c0.04785,-0.01041 0.07806,-0.05592 0.06736,-0.10185c-0.01084,-0.04607 -0.05898,-0.07507 -0.1061,-0.06466l-2.18602,0.46983c-0.04785,0.01041 -0.07806,0.05592 -0.06736,0.10185c0.00925,0.03968 0.04597,0.06674 0.08659,0.06674c0.00651,0 0.01301,-0.00069 0.01951,-0.00208zm0.07936,0.34009l2.18602,-0.46996c0.04785,-0.01041 0.07806,-0.05592 0.06736,-0.10185c-0.0107,-0.04607 -0.05927,-0.07479 -0.1061,-0.06466l-2.18602,0.46996c-0.04785,0.01041 -0.07806,0.05592 -0.06736,0.10185c0.00925,0.03968 0.04597,0.06674 0.08659,0.06674c0.00651,0 0.01301,-0.00069 0.01951,-0.00208zm0.07936,0.33995l2.18588,-0.46983c0.04785,-0.01041 0.07806,-0.05592 0.06736,-0.10185c-0.01084,-0.04607 -0.05941,-0.07507 -0.1061,-0.06466l-2.18588,0.46983c-0.04785,0.01041 -0.07806,0.05592 -0.06736,0.10185c0.00925,0.03968 0.04597,0.06674 0.08659,0.06674c0.0065,0 0.01301,-0.00069 0.01951,-0.00208zm0.07921,0.33995l2.18602,-0.46983c0.04785,-0.01041 0.07806,-0.05592 0.06736,-0.10185c-0.0107,-0.04607 -0.05927,-0.07479 -0.1061,-0.06466l-2.18602,0.46983c-0.04785,0.01041 -0.07806,0.05592 -0.06736,0.10185c0.00925,0.03968 0.04597,0.06674 0.08659,0.06674c0.00651,0 0.01301,-0.00069 0.01951,-0.00208zm2.33274,-0.23172c-0.01084,-0.04607 -0.05898,-0.07493 -0.1061,-0.06466l-2.18602,0.46996c-0.04785,0.01041 -0.07806,0.05592 -0.06736,0.10185c0.00925,0.03968 0.04597,0.06674 0.08659,0.06674c0.0065,0 0.01301,-0.00069 0.01951,-0.00208l2.18602,-0.46996c0.04785,-0.01041 0.07806,-0.05592 0.06736,-0.10185z" /></svg>',
},
"tech_support":{"svg":'<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" class="bi bi-wifi" fill="currentColor"><path d="m13.5,3.3125a0.5,0.5 0 0 1 0.5,0.5l0,7.5l-12,0l0,-7.5a0.5,0.5 0 0 1 0.5,-0.5l11,0zm-11,-1a1.5,1.5 0 0 0 -1.5,1.5l0,8.5l14,0l0,-8.5a1.5,1.5 0 0 0 -1.5,-1.5l-11,0zm-2.5,10.5l16,0a1.5,1.5 0 0 1 -1.5,1.5l-13,0a1.5,1.5 0 0 1 -1.5,-1.5z" id="svg_1"/><path stroke="null" id="svg_2" d="m11.03324,6.28142a0.19924,0.19924 0 0 0 -0.01931,-0.30236a5.1121,5.1121 0 0 0 -3.0141,-0.97731c-1.12603,0 -2.16784,0.36233 -3.0141,0.97731a0.19924,0.19924 0 0 0 -0.01972,0.30236a0.2128,0.2128 0 0 0 0.27442,0.02054a4.70294,4.70294 0 0 1 2.7594,-0.8894c1.0299,0 1.98297,0.32947 2.75899,0.88899c0.08422,0.0608 0.2013,0.05341 0.27442,-0.02013z"/><path stroke="null" id="svg_3" d="m10.14795,7.16713a0.19801,0.19801 0 0 0 -0.02588,-0.30605a3.8842,3.8842 0 0 0 -2.12224,-0.62689c-0.78259,0 -1.51178,0.23005 -2.12224,0.62689a0.19719,0.19719 0 0 0 -0.02588,0.30605a0.21567,0.21567 0 0 0 0.26785,0.0267a3.47544,3.47544 0 0 1 1.88027,-0.54884a3.47544,3.47544 0 0 1 1.87986,0.54884c0.08463,0.05423 0.19719,0.04437 0.26826,-0.0267zm-0.8968,0.8968c0.09284,-0.09284 0.076,-0.24854 -0.04108,-0.30811a2.65916,2.65916 0 0 0 -1.21024,-0.28921c-0.43546,0 -0.84709,0.10435 -1.21024,0.28921c-0.11708,0.05957 -0.13392,0.21526 -0.04108,0.30811l0.00616,0.00616c0.06573,0.06573 0.1672,0.07805 0.251,0.03697a2.25041,2.25041 0 0 1 0.99416,-0.22964c0.35658,0 0.69427,0.08257 0.99416,0.23005c0.08339,0.04108 0.18486,0.02876 0.25059,-0.03738l0.00657,-0.00616zm-0.81587,0.81587c0.08052,-0.08052 0.08134,-0.21362 -0.01643,-0.27113a0.81751,0.81751 0 0 0 -0.41902,-0.11503a0.81751,0.81751 0 0 0 -0.41902,0.11503c-0.09777,0.05751 -0.09695,0.19062 -0.01643,0.27113l0.29003,0.29003a0.2054,0.2054 0 0 0 0.29044,0l0.29044,-0.29044l0,0.00041z"/></svg>',
},
"laundry_room":{"svg":'<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="#000000" version="1.1" xml:space="preserve"><path stroke="null" d="m1.4375,14.625l13.25,0l0,-13.1875l-13.25,0l0,13.1875zm0.4569,-0.45474l0,-8.86746l12.33621,0l0,8.86746l-12.33621,0zm12.33621,-12.27802l0,2.95582l-12.33621,0l0,-2.95582l12.33621,0z" id="svg_2"/><path stroke="null" d="m8.0625,5.98491c-2.14741,0 -3.88362,1.72802 -3.88362,3.8653s1.73621,3.8653 3.88362,3.8653s3.88362,-1.72802 3.88362,-3.8653s-1.73621,-3.8653 -3.88362,-3.8653zm0,7.27586c-1.7819,0 -3.24397,-1.36422 -3.40388,-3.09224c0.73103,-0.06821 1.1194,0.09095 1.5306,0.27284c0.34267,0.15916 0.70819,0.31832 1.23362,0.31832c0.15991,0 0.36552,-0.02274 0.57112,-0.04547c0.93664,-0.15916 1.37069,0.02274 1.85043,0.22737c0.34267,0.15916 0.70819,0.31832 1.23362,0.31832c0.04569,0 0.09138,0 0.13707,0c-0.57112,1.15959 -1.75905,2.00086 -3.15259,2.00086zm3.28965,-2.50108c-0.59397,0.06821 -0.95948,-0.06821 -1.34784,-0.25011c-0.47974,-0.22737 -1.05086,-0.45474 -2.12457,-0.27284c-0.73103,0.13642 -1.09655,-0.02274 -1.5306,-0.22737c-0.43405,-0.1819 -0.91379,-0.40927 -1.73621,-0.31832c0.06853,-1.81897 1.57629,-3.27414 3.42672,-3.27414c1.89612,0 3.42672,1.52338 3.42672,3.41056c0.02284,0.34106 -0.02284,0.65937 -0.11422,0.93222z" id="svg_3"/><path stroke="null" d="m9.20474,3.93858c0.38836,0 0.68534,-0.29558 0.68534,-0.68211s-0.29698,-0.68211 -0.68534,-0.68211s-0.68534,0.29558 -0.68534,0.68211s0.29698,0.68211 0.68534,0.68211zm0,-0.90948c0.13707,0 0.22845,0.09095 0.22845,0.22737s-0.09138,0.22737 -0.22845,0.22737s-0.22845,-0.09095 -0.22845,-0.22737s0.09138,-0.22737 0.22845,-0.22737z" id="svg_4"/><path stroke="null" d="m11.03233,3.93858c0.38836,0 0.68534,-0.29558 0.68534,-0.68211s-0.29698,-0.68211 -0.68534,-0.68211s-0.68534,0.29558 -0.68534,0.68211s0.29698,0.68211 0.68534,0.68211zm0,-0.90948c0.13707,0 0.22845,0.09095 0.22845,0.22737s-0.09138,0.22737 -0.22845,0.22737s-0.22845,-0.09095 -0.22845,-0.22737s0.09138,-0.22737 0.22845,-0.22737z" id="svg_5"/><path stroke="null" d="m12.85991,3.93858c0.38836,0 0.68534,-0.29558 0.68534,-0.68211s-0.29698,-0.68211 -0.68534,-0.68211s-0.68534,0.29558 -0.68534,0.68211s0.29698,0.68211 0.68534,0.68211zm0,-0.90948c0.13707,0 0.22845,0.09095 0.22845,0.22737s-0.09138,0.22737 -0.22845,0.22737s-0.22845,-0.09095 -0.22845,-0.22737s0.09138,-0.22737 0.22845,-0.22737z"/></svg>'
},
"dining_equipment":{"svg":'<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cup"><path stroke="null" d="m7.36779,5.8813c0.28655,0 0.55174,-0.09277 0.76757,-0.24953l0.18896,0.18896c0.04036,0.04036 0.09329,0.06054 0.1462,0.06054c0.0529,0 0.10584,-0.02018 0.1462,-0.06054c0.08075,-0.08078 0.08075,-0.21167 0,-0.29242l-0.18896,-0.18896c0.15673,-0.21586 0.24953,-0.48102 0.24953,-0.76757c0,-0.72206 -0.58746,-1.30952 -1.30952,-1.30952c-0.28655,0 -0.55174,0.09277 -0.76757,0.24953l-0.18896,-0.18896c-0.08075,-0.08072 -0.21167,-0.08072 -0.2924,0c-0.08075,0.08078 -0.08075,0.21167 0,0.29242l0.18896,0.18896c-0.15676,0.21584 -0.24953,0.48102 -0.24953,0.76757c0,0.72206 0.58749,1.30952 1.30952,1.30952zm0,-2.20551c0.49403,0 0.89599,0.40193 0.89599,0.89599c0,0.17228 -0.04899,0.33325 -0.13357,0.46999l-1.23241,-1.23241c0.13674,-0.08458 0.29774,-0.13357 0.46999,-0.13357zm-0.76239,0.42599l1.23241,1.23241c-0.13674,0.08458 -0.29772,0.13357 -0.47002,0.13357c-0.49403,0 -0.89599,-0.40193 -0.89599,-0.89599c0,-0.17228 0.04899,-0.33325 0.1336,-0.46999z" id="svg_4"/><path stroke="null" d="m13.10211,7.23217l-1.55833,0c0.0003,-0.0046 0.00069,-0.00918 0.00069,-0.01384l0,-0.48885c0.25611,-0.08651 0.4411,-0.3289 0.4411,-0.61385l0,-3.08771c0,-0.35724 -0.29063,-0.64787 -0.64787,-0.64787l-0.01378,0l0,-0.45489c0,-0.23563 -0.19169,-0.42732 -0.42732,-0.42732l-7.05762,0c-0.23563,0 -0.42732,0.19169 -0.42732,0.42732l0,0.45489l-0.01378,0c-0.35724,0 -0.64787,0.29063 -0.64787,0.64787l0,3.08771c0,0.28495 0.18499,0.52734 0.4411,0.61385l0,5.38885c-0.25611,0.08651 -0.4411,0.3289 -0.4411,0.61385l0,0.8822c0,0.35724 0.29063,0.64787 0.64787,0.64787l7.93982,0c0.35724,0 0.64787,-0.29063 0.64787,-0.64787l0,-0.8822c0,-0.28495 -0.18499,-0.52734 -0.4411,-0.61385l0,-3.59043l1.55764,0c0.35724,0 0.64787,-0.29063 0.64787,-0.64787s-0.29063,-0.64787 -0.64787,-0.64787l0,0.00001zm-9.27691,-5.307c0,-0.00758 0.00618,-0.01378 0.01378,-0.01378l7.05762,0c0.00761,0 0.01378,0.0062 0.01378,0.01378l0,0.45489l-7.08519,0l0,-0.45489l0.00001,0zm-0.66165,4.19046l0,-3.08771c0,-0.12922 0.10512,-0.23434 0.23434,-0.23434l7.93982,0c0.12922,0 0.23434,0.10512 0.23434,0.23434l0,3.08771c0,0.12922 -0.10512,0.23434 -0.23434,0.23434l-7.93982,0c-0.12922,0 -0.23434,-0.10512 -0.23434,-0.23434zm0.4411,5.96865l0,-5.32078l2.67418,0l0,0.46867l-0.45489,0c-0.11419,0 -0.20677,0.09255 -0.20677,0.20677s0.09258,0.20677 0.20677,0.20677l0.04122,0l0.1411,0.9876c0.0453,0.31712 0.32104,0.55626 0.64139,0.55626l0.07229,0l0,0.23434c0,0.11422 0.09258,0.20677 0.20677,0.20677c0.11419,0 0.20677,-0.09255 0.20677,-0.20677l0,-0.23434l0.46867,0l0,0.23434c0,0.11422 0.09258,0.20677 0.20677,0.20677c0.11419,0 0.20677,-0.09255 0.20677,-0.20677l0,-0.23434l0.07231,0c0.32035,0 0.59607,-0.23913 0.64136,-0.55626l0.07807,-0.5465l0.77967,0l0,0.23434c0,0.11422 0.09258,0.20677 0.20677,0.20677l1.33709,0l0,3.55638l-7.52629,0l-0.00002,-0.00002zm6.07521,0.41353l-0.16955,0.33912c-0.03995,0.07989 -0.12028,0.12955 -0.20961,0.12955l-3.86576,0c-0.08932,0 -0.16966,-0.04965 -0.20961,-0.12955l-0.1696,-0.33912l4.62412,0l0.00001,0zm-1.22717,-4.85211l-0.13274,0.92912c-0.01638,0.11469 -0.11609,0.2012 -0.23199,0.2012l-1.44033,0c-0.11587,0 -0.21559,-0.08651 -0.23199,-0.2012l-0.13272,-0.92912l2.16978,0l-0.00001,0zm-1.76033,-0.41353l0,-0.46867l1.35087,0l0,0.46867l-1.35087,0zm3.77693,0.8822l-0.46867,0l0,-0.46867l0.46867,0l0,0.46867zm-0.67544,-0.8822c-0.11419,0 -0.20677,0.09255 -0.20677,0.20677l0,0.23434l-0.72059,0l0.00394,-0.02757l0.04122,0c0.11419,0 0.20677,-0.09255 0.20677,-0.20677s-0.09258,-0.20677 -0.20677,-0.20677l-0.45489,0l0,-0.46867l2.67418,0l0,0.45483c0,0.00466 0.00039,0.00924 0.00069,0.01384l-1.33778,0zm1.77819,5.49998l0,0.8822c0,0.12922 -0.10512,0.23434 -0.23434,0.23434l-7.93982,0c-0.12922,0 -0.23434,-0.10512 -0.23434,-0.23434l0,-0.8822c0,-0.12922 0.10512,-0.23434 0.23434,-0.23434l1.19552,0l0.26204,0.52408c0.11044,0.22091 0.33251,0.35812 0.57947,0.35812l3.86578,0c0.24696,0 0.46903,-0.13724 0.57947,-0.35812l0.26204,-0.52408l1.19549,0c0.12924,0 0.23434,0.10512 0.23434,0.23434l0.00001,0zm1.53007,-4.61778l-2.21929,0l0,-0.46867l2.21929,0c0.12922,0 0.23434,0.10512 0.23434,0.23434s-0.10509,0.23434 -0.23434,0.23434l0,-0.00001z" id="svg_5"/><path stroke="null" d="m10.4555,4.55799c0.35724,0 0.64787,-0.29063 0.64787,-0.64787s-0.29063,-0.64787 -0.64787,-0.64787s-0.64787,0.29063 -0.64787,0.64787s0.29063,0.64787 0.64787,0.64787zm0,-0.8822c0.12922,0 0.23434,0.10512 0.23434,0.23434s-0.10512,0.23434 -0.23434,0.23434s-0.23434,-0.10512 -0.23434,-0.23434s0.10512,-0.23434 0.23434,-0.23434z" id="svg_6"/><path stroke="null" d="m9.1322,4.11689l0.22055,0c0.11419,0 0.20677,-0.09255 0.20677,-0.20677s-0.09258,-0.20677 -0.20677,-0.20677l-0.22055,0c-0.11419,0 -0.20677,0.09255 -0.20677,0.20677s0.0926,0.20677 0.20677,0.20677z" id="svg_7"/><path fill-rule="evenodd" d="m5.71344,9.91622a0.11706,0.10299 0 0 1 0.09131,-0.03852l3.04357,0a0.11706,0.10299 0 0 1 0.11425,0.12524l-0.05151,0.20413a0.7026,0.61815 0 0 1 -0.30436,1.20581l-0.0309,0.12153a0.5853,0.51495 0 0 1 -0.57126,0.4031l-1.35603,0a0.5853,0.51495 0 0 1 -0.57126,-0.40331l-0.38677,-1.53126a0.11706,0.10299 0 0 1 0.02294,-0.08651l0,-0.00021l0.00002,0zm2.94384,1.29521a0.46824,0.41196 0 0 0 0.20275,-0.80312l-0.20275,0.80332l0,-0.00021l0,0.00001zm-2.70644,-1.12774l0.35493,1.40582a0.35118,0.30897 0 0 0 0.34275,0.24203l1.35603,0a0.35118,0.30897 0 0 0 0.34275,-0.24203l0.35516,-1.40582l-2.75186,0l0.00023,0l0.00001,0z" id="svg_8" stroke="null"/></svg>'
},
"key":{"svg":'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16"><path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>',
},
}