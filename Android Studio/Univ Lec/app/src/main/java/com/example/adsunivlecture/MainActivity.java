package com.example.adsunivlecture;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {


    ImageView imageView;
    TextView textView;
    Button imageButton;
    Button textButton;
    Button exitButton;

    boolean flag = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        imageView = (ImageView) findViewById(R.id.paichaiLogo);
        textView = (TextView) findViewById(R.id.infoText);
        imageButton = (Button) findViewById(R.id.imageButton);
        textButton = (Button) findViewById(R.id.textButton);
        exitButton = (Button) findViewById(R.id.exitButton);

        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!flag){
                    imageView.setVisibility(View.VISIBLE);
                    flag = true;
                }else {
                    imageView.setVisibility(View.INVISIBLE);
                    flag = false;
                }
            }
        });

        textButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!flag){
                    textView.setVisibility(View.VISIBLE);
                    flag = true;
                }else {
                    textView.setVisibility(View.INVISIBLE);
                    flag = false;
                }
            }
        });

        exitButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                finish();
            }
        });
    }
}
