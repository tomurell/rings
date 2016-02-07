
var particleSystem = [];
var attractors = [];


function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);

    //noCursor();
    
    colorMode(HSB, 360, 100, 100, 100);
    
    var at = new Attractor(createVector(width*0.5, height*0.25), 5);
    attractors.push(at);
    
    var at2 = new Attractor(createVector(width*0.5, height*0.5), 5);
    attractors.push(at2);
    
    var at3 = new Attractor(createVector(width*0.5, height*0.75), 5);
    attractors.push(at3);
    
    /*var at4 = new Attractor(createVector(width*0.5, height*0.55), 5);
    attractors.push(at4);
    
    var at5 = new Attractor(createVector(width*0.5, height*0.9), 5);
    attractors.push(at5);

    var at6 = new Attractor(createVector(width*0.625, height*0.375), 5); 
    attractors.push(at6);                                        
    
    var at7 = new Attractor(createVector(width*0.275, height*0.275), 5);    
    attractors.push(at7);                                      
    
    var at8 = new Attractor(createVector(width*0.1, height*0.5), 5); 
    attractors.push(at8);                                      
    
    var at8 = new Attractor(createVector(width*0.1, height*0.875), 5);    
    attractors.push(at8);                                  
    
    var at9 = new Attractor(createVector(width*0.9, height*0.125), 5);    
    attractors.push(at9);                                      
    
    var at10 = new Attractor(createVector(width*0.9, height*0.5), 5); 
    attractors.push(at10);                                      
    
    var at11 = new Attractor(createVector(width*0.9, height*0.875), 5);    
    attractors.push(at11);*/
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
}


function draw() {
    background(0, 100, 0, 5);

    //blendMode(SOFT_LIGHT);
    
    //blendMode(SCREEN);
    
    for (var i=particleSystem.length-1; i>=0; i--){
        
        var p = particleSystem[i];
        
        if(p.areYouDeadYet()){
            particleSystem.splice(i, 1);
            
            }else{
            
            p.update();
            p.draw();
        }
        
        
    }
    
    if(mouseIsPressed){
        createMightyParticles();
        
    }
    
    
    attractors.forEach(function(at){
        at.draw();
        });
    
    
}


var Particle = function(position, velocity, hue) {
    var position = position.copy();
    var velocity = velocity.copy();
    var size = random(4,8);                                   // size
    var initialLifeSpan = random(128,360);                       // lifespan
    var lifeSpan = initialLifeSpan;
    var hue = random(hue-10, hue+10);
    var acc = createVector(0, .001);
    
    this.update = function() {
        lifeSpan--;
        
        position.add(velocity);
        velocity.add(acc);
        acc.mult(0);
        
        attractors.forEach(function(A){
            var att = p5.Vector.sub(A.getPos(), position);
            var distanceSq = att.magSq();
            if(distanceSq > 1){
                att.div(distanceSq);
                att.mult(32*A.getStrength());                  // attractor strength
                acc.add(att);
            }

        });
        
    }
        
    this.draw = function() {
        
        var transparency = map(lifeSpan, 0, initialLifeSpan, 200, 240);
        
        fill(transparency, 100, 95, 100);                      // color
        noStroke();
        ellipse(position.x,
                position.y,
                size,
                size);
        
    }
    
    this.areYouDeadYet = function(){
        return lifeSpan <= 0;
    }
    
    this.getPos = function() {
        return position.copy();
    }
    
    
}


function createMightyParticles(initialPos){
    
    var hue = random(0,360);
    
    var pos;
    if(!initialPos){
        pos = createVector(mouseX, mouseY);
    }else{
        pos = initialPos.copy();
    }

    
    for(var i=0; i<random(80,120); i++){                         // # particles
        var vel3 = createVector(0,1);
                    vel3.rotate(random(0, TWO_PI));            //remove "rotate" to make bars
                    vel3.mult(random(2,3));                    //escape velocity
                                 //remove "random" to make rings
        var newBorn = new Particle(pos, vel3, hue);
    
        particleSystem.push(newBorn);
        
    }

}


function mouseClicked(){
    //createMightyParticles();

    
}


var Attractor = function(pos, s){
      var pos = pos.copy();
      var strength = s;
        this.draw = function(){ 
            noStroke();
            fill(202, 100, 100);                                   // attractor color
            ellipse(pos.x, pos.y, strength, strength);
        }
        
        this.getPos = function(){
            return pos.copy();
        }
    
        this.getStrength = function(){
            return strength;
        }
            
        
}




