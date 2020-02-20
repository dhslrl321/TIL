package chap02;
// 신체검사 데이터용 클래스의 배열에서 평균키와 시력의 분포를 구합니다.(그래프로 나타냄)

class PhysicalExaminationEx_02_10 {
	static final int VMAX = 21; // 시력의 분포 (0.0부터 0.1 단위로 21개)

	static class PhyscData {
		String name; // 이름
		int height; // 키
		double vision; // 시력

		// 생성자
		PhyscData(String name, int height, double vision) {
			this.name = name;
			this.height = height;
			this.vision = vision;
		}
	}

	// 키의 평균값을 구합니다.
	static double aveHeight(PhyscData[] dat) {
		double sum = 0;

		for (int i = 0; i < dat.length; i++)
			sum += dat[i].height;

		return sum / dat.length;
	}

	// 시력의 분포를 구합니다.
	static void distVision(PhyscData[] dat, int[] dist) {
		int i = 0;

		dist[i] = 0;
		for (i = 0; i < dat.length; i++)
			if (dat[i].vision >= 0.0 && dat[i].vision <= VMAX / 10.0)
				dist[(int) (dat[i].vision * 10)]++;
	}

	public static void main(String[] args) {
		PhyscData[] x = { new PhyscData("이나령", 162, 0.3), new PhyscData("전서현", 173, 0.7),
				new PhyscData("이수민", 175, 2.0), new PhyscData("홍준기", 171, 1.5), new PhyscData("유지훈", 168, 1.2),
				new PhyscData("이호연", 174, 1.2), new PhyscData("김한결", 169, 0.8), };
		int[] vdist = new int[VMAX]; // 시력의 분포

		System.out.println("■ 신체검사 리스트 ■");
		System.out.println(" 이름      키      시력");
		System.out.println("--------------");
		for (int i = 0; i < x.length; i++)
			System.out.printf("%-8s%3d%5.1f\n", x[i].name, x[i].height, x[i].vision);

		System.out.printf("\n평균키：%5.1fcm\n", aveHeight(x));

		distVision(x, vdist); // 시력의 분포를 구합니다.

		System.out.println("\n시력의 분포");
		for (int i = 0; i < VMAX; i++) {
			System.out.printf("%3.1f~：", i / 10.0);
			for (int j = 0; j < vdist[i]; j++)
				System.out.print('*');
			System.out.println();
		}
	}
}
