(function() {
    var init, rotate, start, stop,
        active = false,
        spinning = false,
        angle = 0,
        rotation = 0,
        startAngle = 0,
        prevAngle = null,
        center = {
        x: 0,
        y: 0
        },
        R2D = 180 / Math.PI,
        rot = document.getElementById('runner-img');

    init = function() {
        rot.addEventListener("mousedown", start, false);
        rot.addEventListener("touchstart", touchStart, false);

        $(document).bind('mousemove', function(event) {
            if (active === true) {
                event.preventDefault();
                rotate(event);
            }
        });

        $(document).bind('touchmove', function(event) {
            if (active === true) {
                touchRotate(event);
            }
        });

        $(document).bind('mouseup', function(event) {
            if(spinning === false){
                event.preventDefault();
                stop();
            }
        });

        $(document).bind('touchend', function(event) {
            if(spinning === false){
                stop();
            }
        });
    };

    start = function(e) {
        if(spinning === false){
            e.preventDefault();
            var bb = this.getBoundingClientRect(),
            t = bb.top,
            l = bb.left,
            h = bb.height,
            w = bb.width,
            x, y;
            center = {
            x: l + (w / 2),
            y: t + (h / 2)
            };
            x = e.clientX - center.x;
            y = e.clientY - center.y;
            startAngle = R2D * Math.atan2(y, x);
            return active = true;
        }
    };

    touchStart = function(e) {
        if(spinning === false){
            var bb = this.getBoundingClientRect(),
            t = bb.top,
            l = bb.left,
            h = bb.height,
            w = bb.width,
            x, y;
            center = {
            x: l + (w / 2),
            y: t + (h / 2)
            };
            x = e.touches[0].clientX - center.x;
            y = e.touches[0].clientY - center.y;
            startAngle = R2D * Math.atan2(y, x);
            return active = true;
        }
    };

    rotate = function(e) {
        var x = e.clientX - center.x;
        var y = e.clientY - center.y;
        var d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;
        if((
            0 > angle + rotation && angle + rotation > -5
            )||(
            d > 25 && d < 30
            )){
            active = false;
        }
        return rot.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
    };

    touchRotate = function(e) {
        var x = e.touches[0].clientX - center.x;
        var y = e.touches[0].clientY - center.y;
        var d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;
        if((
            0 > angle + rotation && angle + rotation > -5
            )||(
            d > 25 && d < 30
            )){
            active = false;
        }
        return rot.style.webkitTransform = "rotate(" + (angle + rotation) + "deg)";
    };

    stop = function() {
        angle = rotation;
        active = false;
        spinning = true;
        setNumber();
        spring();
    };

    spring = () => {
        if(angle < 0 && angle >= -1){
            angle = 0;
            rotation = 0;
            rot.style.webkitTransform = "rotate(" + (0) + "deg)";
            spinning = false;
        }else if(angle < -120){
            setTimeout(() => {
                //adding here since angle is negative
                angle = 360+angle;
                rot.style.webkitTransform = "rotate(" + (angle) + "deg)";
                spring();
            }, 10)
        }else if(angle < 0){
            setTimeout(() => {
                angle--;
                rot.style.webkitTransform = "rotate(" + (angle) + "deg)";
                spring();
            }, 10)
        }else if(angle > 0){
            setTimeout(() => {
                angle--;
                rot.style.webkitTransform = "rotate(" + (angle) + "deg)";
                spring();
            }, 10)
        }else{
            spinning = false;
        }
    }

    setNumber = () => {
        if(angle != 0){
            if(angle > 175){
                $("#number").append(5)
            }else if(angle > 145){
                $("#number").append(4)
            }else if(angle > 116){
                $("#number").append(3)
            }else if(angle > 86){
                $("#number").append(2)
            }else if(angle > 55){
                $("#number").append(1)
            }else if(angle > -35){
                $("#number").append(0)
            }else if(angle > -64.5){
                $("#number").append(9)
            }else if(angle > -94.5){
                $("#number").append(8)
            }else if(angle > -125){
                $("#number").append(7)
            }else{
                $("#number").append(6)
            }
        }
    }

    dial = () => {
        console.log("tel:"+$("#number").html());
        document.location.href = "tel:"+$("#number").html();
    }

    init();

}).call(this);