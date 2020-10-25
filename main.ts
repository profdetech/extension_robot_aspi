//% weight=13 color=#0084b4 icon="\uf17b"
namespace profdetech_robot{

	/**
	* version 1.1
     * P2 = Moteur gauche
	 * P16 = Moteur droit
	 * P12 = Fin de course detection obstacle
	 * P8 = capteur de vide
     */
    //% blockId=robot_descriptif
    //% block="Descriptif branchement robot"
	//% weight=99 blockGap=24
    export function robot_descriptif(): void {
    }




/**
     * Faire pivoter à gauche le robot à vitesse maximum (P2-P16)
     */
    //% blockId=robot_PGG
    //% block="Pivoter vers la gauche"
	//% weight=92 blockGap=8
    export function PG(): void {
        pins.servoWritePin(AnalogPin.P2, 90);
        pins.servoWritePin(AnalogPin.P16, 180);
		}
		
		/**
     * Faire pivoter à droite le robot à vitesse maximum (P2-P16)
     */
    //% blockId=robot_PDD
    //% block="Pivoter vers la droite"
	//% weight=91 blockGap=24
    export function PD(): void {
        pins.servoWritePin(AnalogPin.P2, 0);
        pins.servoWritePin(AnalogPin.P16, 90);
    }
	
	/**
     * Arrêter le robot (P2-P16)
     */
    //% blockId=robot_stop
    //% block="Arrêter"
	//% weight=90 blockGap=8
    export function arreter(): void {
        // pins.servoWritePin(AnalogPin.P0, 90);
        // pins.servoWritePin(AnalogPin.P14, 90);
		//solution kitronic servolite
		pins.servoWritePin(AnalogPin.P2, 90);
        pins.servoWritePin(AnalogPin.P16, 90);
	}
	
	
    /**
     * Faire avancer le robot (P2-P16)
     */
    //% blockId=robot_avancer
    //% block="Avancer"
	//% weight=89 blockGap=8
    export function avancer(): void {
        pins.servoWritePin(AnalogPin.P2, 0);
        pins.servoWritePin(AnalogPin.P16, 180);
    }

    /**
     * Faire reculer le robot (P2-P16)
     */
    //% blockId=robot_reculer
    //% block="Reculer"
	//% weight=88 blockGap=8
    export function reculer(): void {
        pins.servoWritePin(AnalogPin.P2, 180);
        pins.servoWritePin(AnalogPin.P16, 0);
    }
	
	/**
     * Avancer à une vitesse variable 
	 * en pourcentage (P2-P16) 100% = vitesse maximum
     */
	 //% subcategory="Moteurs"
    //% blockId=rob_vitvar
    //% block="Avancer à la vitesse %speed"
    //% speed.min=0 speed.max=100
    export function avvitvar(speed: number): void {
        /*first convert 0-100 to 0-90*/
        let OutputVal = speed * 0.9;
		let OutputVal2= 90 - OutputVal;
		pins.servoWritePin(AnalogPin.P2, OutputVal2);
		OutputVal2= OutputVal + 90;
        pins.servoWritePin(AnalogPin.P16, OutputVal2);
    }
    
	/**
     * gestion des deux moteurs à une vitesse variable
	 * en pourcentage (P2-P16) 100% = vitesse maximum
     */
	 //% subcategory="Moteurs"
    //% blockId=rob_motvitvar
    //% block="Moteur gauche vitesse %speed1| et moteur droit vitesse %speed2"
    //% speed1.min=0 speed1.max=100 
	//% speed2.min=0 speed2.max=100
    export function avmotvitvar(speed1: number, speed2: number): void {
        /*first convert 0-100 to 0-90*/
        let OutputVal3 = Math.clamp(0, 100, speed1) * 0.9;
		let OutputVal4= 90 - OutputVal3;
		pins.servoWritePin(AnalogPin.P2, OutputVal4);
		OutputVal3 = Math.clamp(0, 100, speed2) * 0.9;
		OutputVal4= OutputVal3 + 90;
        pins.servoWritePin(AnalogPin.P16, OutputVal4);	     
    }
	
		/**
     * Faire pivoter à droite le robot de 90° (P2-P16)
     */
    //% subcategory="Moteurs"
    //% blockId=robot_PD90
    //% block="Pivoter vers la droite de 90°"
    export function PD90(): void {
		let item = 0
		item = input.compassHeading()
		item = item + 90
		if (item > 359) {
			pins.servoWritePin(AnalogPin.P2, 0);
			pins.servoWritePin(AnalogPin.P16, 90);
			while (input.compassHeading() >= 270) {}
			item = item - 360
		} 
		pins.servoWritePin(AnalogPin.P2, 0);
        pins.servoWritePin(AnalogPin.P16, 90);
		while (input.compassHeading() <= item) {}
		pins.servoWritePin(AnalogPin.P2, 90);
        pins.servoWritePin(AnalogPin.P16, 90);
    }

	/**
     * Faire pivoter à gauche le robot de 90° (P2-P16)
     */
    //% subcategory="Moteurs"
    //% blockId=robot_PG90
    //% block="Pivoter vers la gauche de 90°"
    export function PG90(): void {
		let item = 0
		item = input.compassHeading()
		item = item - 90
		if (item < 0) {
		pins.servoWritePin(AnalogPin.P2, 90);
        pins.servoWritePin(AnalogPin.P16, 180);
		while (input.compassHeading() <= 90) {}
			item = item + 360
		} 
		pins.servoWritePin(AnalogPin.P2, 90);
        pins.servoWritePin(AnalogPin.P16, 180);
		while (input.compassHeading() >= item) {}
		pins.servoWritePin(AnalogPin.P2, 90);
        pins.servoWritePin(AnalogPin.P16, 90);
    }
	
		/**
     * Etat du capteur de fin de course détection obstacle sur P12
     */
	 //% subcategory="Détection obstacle"
    //% blockId=obstacle
    //% block="Etat du capteur obstacle (0 ou 1)"
    export function capt_obstacle(): number {
		return pins.digitalReadPin(DigitalPin.P12);
    }
	
	/**
     * Etat du capteur de vide sur P8
     */
	 //% subcategory="Détection du vide"
    //% blockId=vide
    //% block="Etat du capteur de vide (0 ou 1)"
    export function capt_vide(): number {
		return pins.digitalReadPin(DigitalPin.P8);
    }

}