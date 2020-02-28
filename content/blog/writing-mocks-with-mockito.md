---
path: /writing-mocks-with-mockito
date: 2020-02-28T03:22:04.613Z
title: Writing Mocks with Mockito
description: A simple example to get you started
---
Mockito is a mocking framework for Java that allows you to write clean and simple tests. It is [one of the most popular testing frameworks for Java](https://stackoverflow.com/questions/22697/whats-the-best-mock-framework-for-java). Mockito allows you to create **mock objects** in which you can define their behavior, thus making the tests for classes with dependencies on other classes much easier to write.

Writing tests using Mockito typically consists of:
* Mocking away external dependencies and inserting the mocks into the code under test
* Executing the code under test
* Asserting that the code executed correctly

#### Adding Mockito to your application
When it comes to Java development, I like to use Gradle. It is definitely possible to add Mockito to a Maven project, but this blog post will demonstrate how to add Mockito into a Gradle project.

Let's start by creating a Java project (assuming you have a JDK and Gradle installed). Inside of your terminal, create a new directory and initialize a Gradle project:
```
mkdir mockitoExample
cd mockitoExample
gradle init
```
Running `gradle init` will open the setup wizard. Select the following in each of the prompts:
* Select the type of project to generate: application
* Select implementation language: Java
* Select build script DSL: Groovy
* Select test framework: JUnit 4
* Project name: default (or press Enter)
* Source package: default (or press Enter)

Your Gradle project has now been initialized. You can now add Mockito to your project by opening `build.gradle` in a text editor and adding the following to the `dependencies` section:
```
dependencies {
    // auto-generated
    implementation 'com.google.guava:guava:28.1-jre'
    testImplementation 'junit:junit:4.12'

    // add this line
    testImplementation 'org.mockito:mockito-core:2+'
}
```
#### Using Mockito in a simple example
Imagine we have a method that returns a `String` dependent on another method that returns a random number. How would we assert the contents of the `String`? Each time the method is called, the `String` will be different. This is a problem...

However, we can use Mockito! Here's a class with a method that generates a random number:

```java
import java.util.Random;

class NumberGenerator {
    public int generateRandomNumber() {
        Random random = new Random();
        return random.nextInt(24);    // this returns a number between 0-23
    }
}
```

Here is the class under test that uses the `generateRandomNumber()` method:

```java
class App {
    private NumberGenerator numberGenerator;

    public ClassUnderTest(NumberGenerator numberGenerator) {
        this.numberGenerator = numberGenerator;
    }

    public String randomNumberString() {
        return "The random number is " + numberGenerator.generateRandomNumber();
    }
}
```

Let's say we have the following test:

```java
import org.junit.Test;

import static org.junit.Assert.assertEquals;

class AppTest {
    @Test
    public void testsTheRandomNumberStringContents() {
        NumberGenerator numberGenerator = new NumberGenerator();
        App app = new App(numberGenerator);

        // a bad test. this will pass sometimes but fail most of the time
        assertEquals("The random number is 20", app.randomNumberString());
    }
}
```

Here, we are hoping that there is a chance that the `generateRandomNumber()` method will return `20`, therefore making our test pass. In reality, this test will fail most of the time.

So how do we get it to pass all of the time? Mockito!

To use Mockito in our test class:

```java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;

// use Mockito's test runner instead of JUnit's test runner
@RunWith(MockitoJUnitRunner.class)
class AppTest {
    // the mock class
    @Mock
    NumberGenerator numberGenerator;

    @Test
    public void testsTheRandomNumberStringContents() {
        // the mock class is injected into the class under test
        App app = new App(numberGenerator);

        // we can control the output of generateRandomNumber()
        when(numberGenerator.generateRandomNumber()).thenReturn(20);

        // this test will pass 100% of the time
        assertEquals("The random number is 20", app.randomNumberString());
    }
}
```

Running `gradle test` will now show green!

#### Conclusion
While this blog post highlights a simple example of how to use mocks, mocking can become useful especially for methods that are not quite under our control, such as Java class methods or third-party dependencies. Be warned, Mockito will **only mock non-static methods** (this is not an issue if you use PowerMock).

You will most likely encounter a situation where you have to mock Java classes. Something that has helped me and may possibly help you is to have the [Mockito docs](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html) and [Java docs](https://docs.oracle.com/en/java/javase/13/docs/api/index.html) open at the same time so you can understand the methods' return types. We are dealing with a statically-typed language after all!
